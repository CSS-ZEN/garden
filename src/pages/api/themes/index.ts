
import type {NextApiRequest, NextApiResponse} from 'next'

import {getThemesByCursor, HTTPStatusCodes} from 'src/helpers'


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {after} = req.query
    const afterCourse = Array.isArray(after) ? after[0] : after

    return getThemesByCursor(afterCourse)
        .then(r => res.status(HTTPStatusCodes.OK).json(r))
        .catch(err => res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).send(err))
}
