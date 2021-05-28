
import {useState} from 'react'
import {InferGetStaticPropsType} from 'next'

import {Fabric, Button} from 'src/components'
import Page from 'src/components/Page'
import ThemePreview from 'src/components/themepreview'
import type {IVerboseTheme} from 'src/garden'
import {useBlocked} from 'src/hooks'
import {safeWaitPromise, createSnapshot, getThemesByCursor, mbem} from 'src/helpers'
import {defaultThemes, defaultTheme} from 'src/helpers/values'
import {THEME_SNAPSHOT_REVALIDATION_INTERVAL, FETCH_GISTS_CACHE_LIFETIME} from 'src/config'

import styles from './all.module.scss'


const bem = mbem(styles)
const GRID_PAGE_SIZE = 6
let slotId = 0

const injectThemeSlots = (themeChoices: InferGetStaticPropsType<typeof getStaticProps>['themeChoices'], pageSize: number) => {
    const {themes} = themeChoices
    if (themes.length >= pageSize) return themeChoices

    return {
        ...themeChoices,
        themes: themes.concat(Array.from(Array(pageSize), _ => ({
            ...defaultTheme,
            id: 'slot-' + ++slotId,
            stats: {
                stargazerCount: 0,
                pv: 0,
            },
            isSlot: true,
        }))).slice(0, pageSize),
    }
}

export default function All ({themeChoices}: InferGetStaticPropsType<typeof getStaticProps>) {
    const [themeInfo, setThemes] = useState(injectThemeSlots(themeChoices, GRID_PAGE_SIZE))

    const [fetching, fetchThemes] = useBlocked(async (api: string) => {
        const r2 = await fetch(api, {
            headers: {
                'Cache-Control': `s-maxage=${FETCH_GISTS_CACHE_LIFETIME}, stale-while-revalidate`,
            },
        }).then(r => r.json())
        setThemes(injectThemeSlots(r2, GRID_PAGE_SIZE))
    })

    const handleNextThemes = async () => {
        fetchThemes(`/api/themes?after=${themeInfo.pageInfo.endCursor}&take=${GRID_PAGE_SIZE}`)
    }

    const handlePreviousThemes = async () => {
        fetchThemes(`/api/themes?before=${themeInfo.pageInfo.startCursor}&take=${GRID_PAGE_SIZE}`)
    }

    return (
        <Page title="All">
            <Fabric className={bem('all')} clearfix verticle>
                <ThemeGrid themes={themeInfo.themes} fetching={fetching} />

                <Fabric className={bem('all', 'pagination')}>
                    <Button
                        className={bem('all', 'pagination-button')}
                        borderless
                        label="prev"
                        disabled={fetching || !themeInfo.pageInfo.hasPreviousPage}
                        onClick={handlePreviousThemes}
                    />
                    <Button
                        className={bem('all', 'pagination-button')}
                        borderless
                        label="next"
                        disabled={fetching || !themeInfo.pageInfo.hasNextPage}
                        onClick={handleNextThemes}
                    />
                </Fabric>
            </Fabric>
        </Page>
    )
}

function ThemeGrid ({themes, fetching}: {themes: IVerboseTheme[], fetching: boolean}) {
    return (
        <Fabric className={bem('all', 'main', {fetching})} clearfix wrap>
            {themes.map(theme => (
                <Fabric key={theme.id} className={bem('all', 'preview-item')} grow clearfix>
                    <ThemePreview theme={theme} key={theme.id} fetching={fetching} />
                </Fabric>
            ))}
        </Fabric>
    )
}

export async function getStaticProps () {
    const themeChoices = await safeWaitPromise(getThemesByCursor({take: GRID_PAGE_SIZE}), defaultThemes)
    themeChoices.themes.forEach(theme => {
        createSnapshot({gistid: theme.id})
    })

    return {
        props: {
            themeChoices,
        },
        revalidate: THEME_SNAPSHOT_REVALIDATION_INTERVAL,
    }
}
