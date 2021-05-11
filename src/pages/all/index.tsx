
import {Head, Fabric, Preview, Landing} from 'src/components'
import {InferGetStaticPropsType} from 'next'
import {useState} from 'react'
import {useRouter} from 'next/router'
import fetchGists from 'src/helpers/fetchGistsIds'
import styles from './index.module.scss'
import {IGraphqlPageQuery} from 'src/helpers/fetchGists'
import {createSnapshot} from 'src/helpers'


export default function All ({gists}: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter()
    const [curPage, setcurPage] = useState(1)
    const pageNum = 6
    const totalPage = Math.ceil(gists.length / 6)
    if (router.isFallback) return <Landing />
    let curPageGists = gists.slice((curPage-1)*pageNum, curPage*pageNum)
    console.log('gists', gists)
    console.log('curPageGists', curPageGists)
    const themesCard = curPageGists.map(
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
            {curPage > 1 ? <a onClick={()=> setcurPage(curPage-1)} className={styles['right']}></a> : ''}
            {curPage < totalPage? <a onClick={()=> setcurPage(curPage+1)} className={styles['left']}></a> : ''}
        </Fabric>
    )
}
export async function getStaticProps () {
    const gists = await getGists()
    return {
        props: {
            gists: gists,
        },
        revalidate: true, // incremental static regeneration everytime
    }
}

export async function getGists () {
    let gists = [] as any[]
    let params = {take: 6, after: undefined, before: undefined} as IGraphqlPageQuery
    while (true) {
        const res = await fetchGists(params)
        res.gists.forEach(theme => {
            gists.push(theme)
            createSnapshot(theme.name)
        })
        let {endCursor} = res.pageInfo
        if (endCursor) params.after = endCursor
        if (!res.pageInfo.hasNextPage) break

    }
    return gists
}
