
import {useState} from 'react'
import {InferGetStaticPropsType} from 'next'

import {useBlocked} from 'src/hooks'
import {Head, Fabric} from 'src/components'
import ThemePreview from 'src/components/themepreview'
import {defaultThemes, resetStyle} from 'src/helpers/values'
import {safeWaitPromise, createSnapshot, getThemesByCursor, mbem} from 'src/helpers'
import {THEME_SNAPSHOT_REVALIDATION_INTERVAL, FETCH_GISTS_CACHE_LIFETIME} from 'src/config'
import {ArrowL, ArrowR} from 'src/components/icons'
import styles from './all.module.scss'

const bem = mbem(styles)
const COUNT_PER_PAGE = 6

export default function All ({themeChoices}: InferGetStaticPropsType<typeof getStaticProps>) {
    const [themeInfo, setThemes] = useState(themeChoices)

    const [, fetchThemes] = useBlocked(async (api: string) => {
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
        <Fabric>
            <Head title="All Designs | CSS Zen Garden">
                <style>{resetStyle}</style>
            </Head>

            <h1 className={bem('all', 'title')}>All Designs</h1>
            <Fabric className={bem('all', 'main')} clearfix wrap>
                {themeInfo.themes.map(theme => (
                    <Fabric key={theme.id} className={bem('all', 'preview-item')} clearfix>
                        <ThemePreview theme={theme} />
                    </Fabric>
                ))}
            </Fabric>
            {themeInfo.pageInfo.hasPreviousPage ? <a onClick={handlePreviousThemes} className={bem('all', 'chevron', ['right'])} ><ArrowL /></a> : ''}
            {themeInfo.pageInfo.hasNextPage ? <a onClick={handleNextThemes} className={bem('all', 'chevron', ['left'])} ><ArrowR /></a> : ''}
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
