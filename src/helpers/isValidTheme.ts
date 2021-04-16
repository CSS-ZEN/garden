
import {ITrialTheme, ITheme} from 'src/garden'

export default function isValidTheme (theme: ITrialTheme): theme is ITheme {
    if (!theme.manifest) return false
    if (!theme.manifest.author || !theme.manifest.name) return false
    return true
}
