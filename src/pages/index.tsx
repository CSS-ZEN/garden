
import {GetStaticProps, InferGetStaticPropsType} from 'next'

import Garden, {IGardenProps} from 'src/garden'
import {getThemePropsById, safeWaitPromise, getThemesByCursor} from 'src/helpers'
import {DEFAULT_THEME_ID} from 'src/config'


export default function Home ({theme, themeChoices}: InferGetStaticPropsType<typeof getStaticProps>) {
    return <Garden theme={theme} themeChoices={themeChoices} />
}

export const getStaticProps: GetStaticProps<IGardenProps, {}> = async () => {
    const [theme, themeChoices] = await Promise.all([
        getThemePropsById(DEFAULT_THEME_ID),
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
        revalidate: true, // incremental static regeneration everytime
    }
}
