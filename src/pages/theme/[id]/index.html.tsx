
import {GetStaticPaths, InferGetStaticPropsType, GetStaticPropsResult} from 'next'
import {useRouter} from 'next/router'
import type {ParsedUrlQuery} from 'querystring'

import {DEFAULT_BUILD_THEMES, THEME_REVALIDATION_INTERVAL} from 'src/config'
import {getThemePropsById, safeWaitPromise, getThemesByCursor} from 'src/helpers'
import Landing from 'src/components/landing'
import Garden, {IGardenProps} from 'src/garden'


interface IStaticProps extends ParsedUrlQuery {
    id: string
}

export default function ThemePage ({theme, themeChoices}: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter()

    if (router.isFallback) return <Landing />

    return <Garden theme={theme} themeChoices={themeChoices} />
}

export const getStaticPaths: GetStaticPaths<IStaticProps> = async ctx => {
    return {
        paths: DEFAULT_BUILD_THEMES.map(id => ({
            params: {
                id,
            },
        })),
        fallback: true,
    }
}

export const getStaticProps: (context: {params: IStaticProps}) => Promise<GetStaticPropsResult<IGardenProps>> = async ({params: {id}}) => {
    const [theme, themeChoices] = await Promise.all([
        getThemePropsById(id),
        safeWaitPromise(getThemesByCursor(), {
            themes: [],
            pageInfo: {
                endCursor: null,
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: null,
            },
        }),
    ])

    if (!theme) return {
        notFound: true,
    }
    return {
        props: {
            theme,
            themeChoices,
        },
        revalidate: THEME_REVALIDATION_INTERVAL,
    }
}
