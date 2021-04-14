
import {InferGetStaticPropsType} from 'next'

import Garden from 'src/garden'
import {getThemePropsById} from 'src/helpers'
import {DEFAULT_THEME_ID} from 'src/config'


export const getStaticProps = async () => getThemePropsById(DEFAULT_THEME_ID)

export default function Home ({theme}: InferGetStaticPropsType<typeof getStaticProps>) {
    return <Garden theme={theme} />
}
