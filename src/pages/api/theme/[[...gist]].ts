// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type {NextApiRequest, NextApiResponse} from 'next'

import {DEFAULT_THEME_FILE, DEFAULT_THEME_ID} from 'src/config'
import {fetchGist} from 'src/helpers'


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {gist = []} = req.query
    const gistid = gist[0] || DEFAULT_THEME_ID
    const filename = gist[1] || DEFAULT_THEME_FILE

    return fetchGist(gistid).then(r => {
        const {ok, status, body} = r
        if (ok) {
            if (body.files && body.files[filename]) {
                const file = body.files[filename]

                res.setHeader('Content-Type', file.type)
                if (file.type.startsWith('image/') && file.language !== 'SVG') {
                    fetch(file.raw_url).then(r => res.status(r.status).send(r.body))
                } else res.status(200).send(file.content)
            } else res.status(404).send('Content Not Found')
        } else res.status(status).send(body.message)
    }).catch(err => res.status(500).send(err))
}
