
import type {NextApiRequest, NextApiResponse} from 'next'

import {fetchGists, isValidTheme, safeReadJson} from 'src/helpers'
import type {ITheme} from 'src/garden'


export default async (req: NextApiRequest, res: NextApiResponse) => {
    return fetchGists().then(r => {
        const {gists, pageInfo} = r
        const themes: ITheme[] = gists.map(({id, files}) => ({
            id,
            theme: `/api/theme/${id}`,
            manifest: safeReadJson(files.find(file => file.name === 'manifest.json').text)
        })).filter(isValidTheme)
        res.status(200).json({themes, pageInfo})
    }).catch(err => res.status(500).send(err))
}
