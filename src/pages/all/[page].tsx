
import {Head, Fabric, Preview, Landing} from 'src/components'
import {InferGetStaticPropsType} from 'next'
import Link from 'next/link'
import {useRouter} from 'next/router'
import fetchGists from 'src/helpers/fetchGistsIds'
import styles from './index.module.scss'
import {IGraphqlPageQuery} from 'src/helpers/fetchGists'
import {createSnapshot} from 'src/helpers'


export default function All (props: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter()

    if (router.isFallback) return <Landing />
    const {gists, prevPage, nextPage} = props as {gists: any[], prevPage: string, nextPage: string}
    const themesCard = gists.map(
        (theme: ANY, index) => {
            return <Preview className={styles['preview-item']} description={theme.description} gistsid={theme.name} key={theme.name}></Preview>
        }

    )
    return (
        <Fabric className={styles['contianer']}>
            <Head title="All Designs | CSS Zen Garden" />
            <h1 className={styles.h1}>
                All Designs
            </h1>
            <Fabric clearfix className={styles['all-mian']}>
                {themesCard}
            </Fabric>
            {prevPage ? <Link href={`/all/${prevPage}`}><a className={styles['right']}></a></Link> : ''}
            {nextPage ? <Link href={`/all/${nextPage}`}><a className={styles['left']}></a></Link> : ''}
        </Fabric>
    )
}
export async function getStaticProps ({params: {page = 1}}: ANY) {
    let [curpage, cursor, tag] = page.split('$')
    curpage = Number(curpage)
    let params = {
        take: 6,
        after: tag == 'after' ? cursor : undefined,
        before: tag == 'before' ? cursor : undefined
    }
    const res = await fetchGists(params)
    if (!res) return {
        notFound: true
    }
    // res.gists.map(theme => createSnapshot(theme.name))
    return {
        props: {
            gists: res.gists,
            prevPage: curpage === 1 ? '' : (curpage === 2 ? '1' : `${curpage - 1}$${res.pageInfo.startCursor}$before`),
            nextPage: res.pageInfo.hasNextPage ? `${curpage + 1}$${res.pageInfo.endCursor}$after` : ''
        },
        revalidate: true, // incremental static regeneration everytime
    }
}

export async function getPaths () {
    // let gistsIDs = [] as any[]
    let paths = []
    let page = 0
    let params = {take: 6, after: undefined, before: undefined} as IGraphqlPageQuery
    while (true) {
        const res = await fetchGists(params)
        res.gists.forEach(theme => {
            // gistsIDs.push(v.name)
            createSnapshot(theme.name)
        })
        page += 1
        paths.push({
            'params': {page: `${page}${params.after ? '$' + params.after + '$after' : ''}`}
        })
        let {startCursor, endCursor} = res.pageInfo
        if (res.pageInfo.hasPreviousPage) {
            paths.push({
                'params': {page: `${page - 1}$${startCursor}$before`}
            })
        }
        if (endCursor) params.after = endCursor
        if (!res.pageInfo.hasNextPage) break
    }
    return paths
}

export async function getStaticPaths () {
    const paths = await getPaths()
    return {paths, fallback: false}
}
