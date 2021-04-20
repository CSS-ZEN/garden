// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type {NextApiRequest, NextApiResponse} from 'next'
import {HTTPStatusCodes} from 'src/helpers'


export default (req: NextApiRequest, res: NextApiResponse) => {
    const {name = '?'} = req.query
    res.status(HTTPStatusCodes.OK).json({name})
}
