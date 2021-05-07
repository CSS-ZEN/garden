// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type {NextApiRequest, NextApiResponse} from 'next'

import {fetchGist, HTTPStatusCodes} from 'src/helpers'


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {id = ''} = req.query

    return fetchGist(String(id)).then(r => {
        const {status, body} = r
        return res.status(status).send(body)
    }).catch(err => res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).send(err))
}
