
import {DEFAULT_THEME_FILE} from 'src/config'
import fetchGist from './fetchGist'
import safeReadJson from './safeReadJson'
import {ITrialTheme} from 'src/garden'


export default async function getThemePropsById (id: string): Promise<ITrialTheme | undefined> {
    const {ok, body} = await fetchGist(id)
    if (!ok || !body.files || !body.files[DEFAULT_THEME_FILE]) return

    const theme = body.files[DEFAULT_THEME_FILE].content
    const manifest = body.files['manifest.json'] ? safeReadJson(body.files['manifest.json'].content) : {}
    const {author, contact, name} = manifest as unknown as ITrialTheme['manifest']

    return {
        id,
        theme,
        manifest: {author, contact, name},
    }
}
