
import {useState} from 'react'
import {InferGetStaticPropsType} from 'next'

import {useBlocked} from 'src/hooks'
import {Head, Fabric, Button, Domino} from 'src/components'
import ThemePreview from 'src/components/themepreview'
import {defaultThemes, resetStyle} from 'src/helpers/values'
import {safeWaitPromise, createSnapshot, getThemesByCursor, mbem} from 'src/helpers'
import {THEME_SNAPSHOT_REVALIDATION_INTERVAL, FETCH_GISTS_CACHE_LIFETIME} from 'src/config'
import styles from './all.module.scss'

const bem = mbem(styles)
const COUNT_PER_PAGE = 6

export default function All ({themeChoices}: InferGetStaticPropsType<typeof getStaticProps>) {
    const [themeInfo, setThemes] = useState(themeChoices)

    const [fetching, fetchThemes] = useBlocked(async (api: string) => {
        const r2 = await fetch(api, {
            headers: {
                'Cache-Control': `s-maxage=${FETCH_GISTS_CACHE_LIFETIME}, stale-while-revalidate`,
            },
        }).then(r => r.json())
        setThemes(r2)
    })

    const handleNextThemes = async () => {
        fetchThemes(`/api/themes?after=${themeInfo.pageInfo.endCursor}&take=${COUNT_PER_PAGE}`)
    }

    const handlePreviousThemes = async () => {
        fetchThemes(`/api/themes?before=${themeInfo.pageInfo.startCursor}&take=${COUNT_PER_PAGE}`)
    }

    return (
        <Fabric className={bem('all')} clearfix>
            <Head title="All Designs | CSS Zen Garden">
                <style>{resetStyle}</style>
            </Head>
            <Fabric className={bem('all', 'header')} clearfix>
                <img className={bem('all-header', 'logo')} src="./Enso.svg" alt="" />
                <h1 className={bem('all-header', 'title')}>All Designs</h1>
                <Fabric grow />
            </Fabric>
            <Fabric className={bem('all', 'main', {fetching})} clearfix wrap>
                {themeInfo.themes.map(theme => (
                    <Fabric key={theme.id} className={bem('all', 'preview-item')} grow clearfix>
                        <ThemePreview theme={theme} key={theme.id} />
                    </Fabric>
                ))}
                <Domino className={bem('all', 'domino')} />
            </Fabric>
            <Fabric>
                <Button
                    borderless
                    label="prev"
                    disabled={fetching || !themeInfo.pageInfo.hasPreviousPage}
                    onClick={handlePreviousThemes}
                />
                <Button
                    borderless
                    label="next"
                    disabled={fetching || !themeInfo.pageInfo.hasNextPage}
                    onClick={handleNextThemes}
                />
            </Fabric>
        </Fabric>
    )
}
export async function getStaticProps () {
    const themeChoices = await safeWaitPromise(getThemesByCursor({take: COUNT_PER_PAGE}), defaultThemes)
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
