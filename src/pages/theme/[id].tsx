
import {GetStaticProps, GetStaticPaths, InferGetStaticPropsType} from 'next'
import {useRouter} from 'next/router'
import type {ParsedUrlQuery} from 'querystring'

import {DEFAULT_BUILD_THEMES, THEME_REVALIDATION_INTERVAL} from 'src/config'
import {getThemePropsById, isValidTheme} from 'src/helpers'
import Landing from 'src/components/landing'
import Garden, {IGardenProps} from 'src/garden'


interface IStaticProps extends ParsedUrlQuery {
    id: string
}

export default function ThemePage ({theme}: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter()

    if (router.isFallback) return <Landing />

    return <Garden theme={theme} />
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

export const getStaticProps: GetStaticProps<IGardenProps, IStaticProps> = async ({params: {id}}) => {
    const theme = await getThemePropsById(id)

    if (!theme) return {
        notFound: true
    }
    return {
        props: {
            theme,
            themeChoices: [theme].filter(isValidTheme),
        },
        revalidate: THEME_REVALIDATION_INTERVAL,
    }
}
