
import type {IGardenProps} from 'src/garden'


export const defaultThemeStyle = `* {
    box-sizing: border-box;
}`

export const defaultTheme: IGardenProps['theme'] = {
    id: '',
    theme: defaultThemeStyle,
}

export const defaultThemes: IGardenProps['themeChoices'] = {
    themes: [],
    pageInfo: {
        endCursor: null,
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: null,
    },
}
