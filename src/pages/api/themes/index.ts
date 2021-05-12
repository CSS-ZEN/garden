
import type {NextApiRequest, NextApiResponse} from 'next'

import {getThemesByCursor, HTTPStatusCodes} from 'src/helpers'


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {after: afterQuery, before: beforeQuery, take: takeQuery} = req.query
    const after = Array.isArray(afterQuery) ? afterQuery[0] : afterQuery
    const before = Array.isArray(beforeQuery) ? beforeQuery[0] : beforeQuery
    const take = Number(takeQuery) || 8

    return getThemesByCursor({after, before, take})
        .then(r => res.status(HTTPStatusCodes.OK).json(r))
        .catch(err => res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).send(err))
}
