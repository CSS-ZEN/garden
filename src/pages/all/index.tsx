
import {useState} from 'react'
import {InferGetStaticPropsType} from 'next'

import {Head, Fabric, Button} from 'src/components'
import Enso from 'src/components/icons/Enso'
import ThemePreview from 'src/components/themepreview'
import type {IVerboseTheme} from 'src/garden'
import {useBlocked} from 'src/hooks'
import {safeWaitPromise, createSnapshot, getThemesByCursor, mbem} from 'src/helpers'
import {defaultThemes, resetStyle} from 'src/helpers/values'
import {THEME_SNAPSHOT_REVALIDATION_INTERVAL, FETCH_GISTS_CACHE_LIFETIME} from 'src/config'

import styles from './all.module.scss'


const bem = mbem(styles)
const GRID_PAGE_SIZE = 6

export default function All ({themeChoices}: InferGetStaticPropsType<typeof getStaticProps>) {
    const [themeInfo, setThemes] = useState(themeChoices)

    const [fetching, fetchThemes] = useBlocked(async (api: string) => {
        const r2 = await fetch(api, {
            headers: {
                'Cache-Control': `s-maxage=${FETCH_GISTS_CACHE_LIFETIME}, stale-while-revalidate`,
            },
        }).then(r => r.json())
        // TODO: @sy empty theme slots
        setThemes(r2)
    })

    const handleNextThemes = async () => {
        fetchThemes(`/api/themes?after=${themeInfo.pageInfo.endCursor}&take=${GRID_PAGE_SIZE}`)
    }

    const handlePreviousThemes = async () => {
        fetchThemes(`/api/themes?before=${themeInfo.pageInfo.startCursor}&take=${GRID_PAGE_SIZE}`)
    }

    return (
        <Fabric className={bem('all')} clearfix>
            <Head title="All Designs | CSS Zen Garden">
                <style>{resetStyle}</style>
            </Head>
            <Fabric className={bem('all', 'header')} clearfix>
                <Enso className={bem('all-header', 'logo')} />
                <h1 className={bem('all-header', 'title')}>All Designs</h1>
                <Fabric grow />
            </Fabric>

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
