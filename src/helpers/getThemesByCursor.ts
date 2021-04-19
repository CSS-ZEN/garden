
import {ITheme} from 'src/garden'

import fetchGists, {IGraphqlPageInfo} from './fetchGists'
import safeReadJson from './safeReadJson'
import isValidTheme from './isValidTheme'


export default async function getThemesByCursor (cursor?: string): Promise<{
    themes: ITheme[]
    pageInfo: IGraphqlPageInfo
}> {
    const {gists, pageInfo} = await fetchGists(cursor)

    const themes: ITheme[] = gists.map(({id, files}) => ({
        id,
        theme: `/api/theme/${id}`,
        manifest: safeReadJson(files.find(file => file.name === 'manifest.json').text)
    })).filter(isValidTheme)

    return {
        themes,
        pageInfo,
    }
}
