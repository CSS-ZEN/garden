
import type {NextApiRequest, NextApiResponse} from 'next'

import {getThemesByCursor, HTTPStatusCodes} from 'src/helpers'


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {after, before} = req.query
    const afterCursor = Array.isArray(after) ? after[0] : after
    const beforeCursor = Array.isArray(before) ? before[0] : before

    return getThemesByCursor({after: afterCursor, before: beforeCursor})
        .then(r => res.status(HTTPStatusCodes.OK).json(r))
        .catch(err => res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).send(err))
}
