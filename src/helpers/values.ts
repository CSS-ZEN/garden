
import type {ITheme, IThemeManifest, IVerboseTheme} from 'src/garden'
import type {IGraphqlPageInfo} from 'src/helpers/fetchGists'


export interface IBasicFile {
    filename: string
    content: string
}

export interface IGistFile extends IBasicFile {
    language: string
}

export interface IEditTheme extends ITheme {
    files: Record<string, IGistFile>
}

export const resetStyle = `
* {
    background-repeat: no-repeat;
    text-decoration: none;
    font-size: 100%;
    vertical-align: baseline;
    box-shadow: none;
    -webkit-font-smoothing: antialiased;
}

*, *::after, *::before {
    box-sizing: border-box;
}

*:focus {
    outline: none;
}

html {
    font-size: 16px;
}

body {
    height: 100%;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
}

a {
    text-decoration: none;
    color: #202124;
}

ul {
    list-style: none;
    -webkit-padding-start: 0;
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
}

h1 {
    margin: 0;
    font-size: 1.5em;
}

input {
    border-radius: 0;
    appearance: none;
}

form {
    margin-top: 0;
    margin-bottom: 0;
    margin-block-start: 1em;
    margin-block-end: 2em;
}
`

export const defaultThemeStyle = resetStyle

const defualtManifest: IThemeManifest = {
    name: '',
    author: '',
    contact: '',
}

const defaultScssStyle = `
$RED: green;

* {
    color: $RED;
}
`

export const defaultScssThemeFile = {
    filename: 'theme.scss',
    language: 'scss',
    content: defaultScssStyle,
}

export const defaultTheme: IEditTheme = {
    id: '',
    theme: defaultThemeStyle,
    manifest: defualtManifest,
    files: {
        ['theme.css']: {
            filename: 'theme.css',
            language: 'css',
            content: defaultThemeStyle,
        },
        ['manifest.json']: {
            filename: 'manifest.json',
            language: 'JSON',
            content: JSON.stringify(defualtManifest, null, 4),
        },
    },
}

export const defaultThemes: {
    themes: IVerboseTheme[]
    pageInfo: IGraphqlPageInfo
} = {
    themes: [],
    pageInfo: {
        endCursor: null,
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: null,
    },
}
