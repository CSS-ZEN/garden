
import {GetStaticProps, InferGetStaticPropsType} from 'next'

import Garden, {IGardenProps} from 'src/garden'
import {getThemePropsById, isValidTheme} from 'src/helpers'
import {DEFAULT_THEME_ID} from 'src/config'


export default function Home ({theme}: InferGetStaticPropsType<typeof getStaticProps>) {
    return <Garden theme={theme} themeChoices={[theme as any]} />
}

export const getStaticProps: GetStaticProps<IGardenProps, {}> = async () => {
    const theme = await getThemePropsById(DEFAULT_THEME_ID)

    if (!theme) return {
        notFound: true
    }
    return {
        props: {
            theme,
            themeChoices: [theme].filter(isValidTheme)
        },
        revalidate: true, // incremental static regeneration everytime
    }

}
