
import type {NextApiRequest, NextApiResponse} from 'next'

import {getThemesByCursor} from 'src/helpers'


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {after} = req.query
    const afterCourse = Array.isArray(after) ? after[0] : after

    return getThemesByCursor(afterCourse)
        .then(r => res.status(200).json(r))
        .catch(err => res.status(500).send(err))
}
