
import type {IVerboseTheme, IThemeManifest} from 'src/garden'

import fetchGists, {IGraphqlPageQuery, IGraphqlPageInfo} from './fetchGists'
import safeReadJson from './safeReadJson'
import isValidTheme from './isValidTheme'


export default async function getThemesByCursor (query: IGraphqlPageQuery = {}): Promise<{
    themes: IVerboseTheme[]
    pageInfo: IGraphqlPageInfo
}> {
    const {gists, pageInfo} = await fetchGists(query)

    const themes: IVerboseTheme[] = gists.map(({name: id, files, stargazerCount}) => ({
        id,
        theme: `/api/theme/${id}`,
        manifest: safeReadJson(files.find(file => file.name === 'manifest.json')?.text, {} as IThemeManifest),
        stats: {
            stargazerCount,
            pv: 0, // TODO: @sy
        },
    })).filter(isValidTheme)

    return {
        themes,
        pageInfo,
    }
}
