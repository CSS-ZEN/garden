
import type {NextApiRequest, NextApiResponse} from 'next'
import {HTTPStatusCodes, createSnapshot} from 'src/helpers'


export default async (req: NextApiRequest, res: NextApiResponse) => {
    // TODO: referrer validation

    const {id = ''} = req.query
    const allowLength = 32
    if (typeof id !== 'string' || id.length !== allowLength) return res.status(HTTPStatusCodes.BAD_REQUEST).end()
    const r = await createSnapshot({gistid: id})
    res.setHeader('Content-Type', 'image/jpg')
    res.setHeader('Cache-Control', 'max-age=60')
    return res.status(HTTPStatusCodes.OK).send(r.body)
}
