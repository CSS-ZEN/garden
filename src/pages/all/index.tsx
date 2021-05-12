
import {useState} from 'react'
import {InferGetStaticPropsType} from 'next'
import {useRouter} from 'next/router'
import {Head, Fabric, Preview, Landing} from 'src/components'
import {IGraphqlPageQuery} from 'src/helpers/fetchGists'
import {fetchGists, createSnapshot} from 'src/helpers'
import {THEME_REVALIDATION_INTERVAL} from 'src/config'
import styles from './index.module.scss'

export default function All ({gists}: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter()
    if (router.isFallback) return <Landing />

    const [curPage, setcurPage] = useState(1)
    const pageNum = 6
    const totalPage = Math.ceil(gists.length / pageNum)
    const curPageGists = gists.slice((curPage - 1) * pageNum, curPage * pageNum)
    const themesCard = curPageGists.map(
        (theme: ANY) => <Preview className={styles['preview-item']} description={theme.description} gistsid={theme.name} key={theme.name} />
    )
    const prevPage = () => setcurPage(curPage - 1)
    const nextPage = () => setcurPage(curPage + 1)
    return (
        <Fabric className={styles.contianer}>
            <Head title="All Designs | CSS Zen Garden" />
            <h1 className={styles.h1}>
                All Designs
            </h1>
            <Fabric clearfix className={styles['all-mian']}>
                {themesCard}
            </Fabric>
            {curPage > 1 ? <a onClick={prevPage} className={styles.right} /> : ''}
            {curPage < totalPage ? <a onClick={nextPage} className={styles.left} /> : ''}
        </Fabric>
    )
}
export async function getStaticProps () {
    const gists = await getGists()
    console.info('gists', gists.length)
    return {
        props: {
            gists,
        },
        revalidate: THEME_REVALIDATION_INTERVAL, // incremental static regeneration everytime
    }
}

export async function getGists () {
    const gists = [] as ANY[]
    const params = {take: 6, after: undefined, before: undefined} as IGraphqlPageQuery
    while (true) {
        const res = await fetchGists(params)
        res.gists.forEach(theme => {
            gists.push(theme)
            createSnapshot(theme.name)
        })
        const {endCursor} = res.pageInfo
        if (endCursor) params.after = endCursor
        if (!res.pageInfo.hasNextPage || true) break
    }
    return gists
}
