
import {DEFAULT_THEME_FILE} from 'src/config'
import fetchGist from './fetchGist'
import safeReadJson from './safeReadJson'
import type {ITrialTheme, IThemeManifest} from 'src/garden'


export default async function getThemePropsById (id: string): Promise<ITrialTheme | undefined> {
    const {ok, body} = await fetchGist(id)
    if (!ok || !body.files || !body.files[DEFAULT_THEME_FILE]) return undefined

    const theme = body.files[DEFAULT_THEME_FILE].content
    const manifest: Partial<IThemeManifest> = safeReadJson(body.files['manifest.json']?.content, {})
    const {author, contact, name} = manifest

    return {
        id,
        theme,
        manifest: {author, contact, name},
    }
}
