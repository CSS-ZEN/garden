
import {GetStaticProps} from 'next'

import {DEFAULT_THEME_FILE} from 'src/config'
import fetchGist from './fetchGist'
import safeReadJson from './safeReadJson'
import {ITheme} from 'src/garden'


const getThemePropsById: (id: string) => R<GetStaticProps<{theme: ITheme}, any>> = async (id: string) => {
    const {ok, body} = await fetchGist(id)
    if (!ok || !body.files || !body.files[DEFAULT_THEME_FILE]) return {notFound: true}

    const theme = `/api/theme/${id}/${DEFAULT_THEME_FILE}`
    const manifest = body.files['manifest.json'] ? safeReadJson(body.files['manifest.json'].content) : {}
    const {author, contact, name} = manifest as unknown as ITheme['manifest']

    return {
        props: {
            theme: {
                id,
                theme,
            },
            manifest: {author, contact, name},
        },
        revalidate: 600, // incremental static regeneration in 600 seconds later
    }
}

export default getThemePropsById
