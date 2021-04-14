
import {GetStaticProps, GetStaticPaths, InferGetStaticPropsType} from 'next'
import {useRouter} from 'next/router'
import type {ParsedUrlQuery} from 'querystring'

import {DEFAULT_BUILD_THEMES} from 'src/config'
import {getThemePropsById} from 'src/helpers'
import Landing from 'src/components/landing'
import Garden, {ITheme} from 'src/garden'


interface IStaticProps extends ParsedUrlQuery {
    id: string
}

export const getStaticPaths: GetStaticPaths<IStaticProps> = async ctx => {
    // TODO: @sy generate with github graphql api
    return {
        paths: DEFAULT_BUILD_THEMES.map(id => ({
            params: {
                id
            }
        })),
        fallback: true
    }
}

export const getStaticProps: GetStaticProps<{theme: ITheme}, IStaticProps> = async ({params: {id}}) => getThemePropsById(id)

const ThemePage = ({theme}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter()

    if (router.isFallback) return <Landing />

    return <Garden theme={theme} />
}

export default ThemePage
