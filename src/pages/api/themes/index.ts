
import type {NextApiRequest, NextApiResponse} from 'next'

import {getThemesByCursor, HTTPStatusCodes} from 'src/helpers'


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {after, before, take=8} = req.query
    const afterCursor = Array.isArray(after) ? after[0] : after
    const beforeCursor = Array.isArray(before) ? before[0] : before

    return getThemesByCursor({after: afterCursor, before: beforeCursor, take: Number(take)})
        .then(r => res.status(HTTPStatusCodes.OK).json(r))
        .catch(err => res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).send(err))
}
