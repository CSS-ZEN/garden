// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type {NextApiRequest, NextApiResponse} from 'next'

import {DEFAULT_THEME_FILE, DEFAULT_THEME_ID} from 'src/config'
import {fetchGist, HTTPStatusCodes} from 'src/helpers'


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
                if (isImage(file) || isFont(file)) {
                    fetch(file.raw_url).then(r2 => res.status(r2.status).send(r2.body))
                } else res.status(HTTPStatusCodes.OK).send(file.content)
            } else res.status(HTTPStatusCodes.NOT_FOUND).send('Content Not Found')
        } else res.status(status).send(body.message)
    }).catch(err => res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).send(err))
}

interface IGistFile {
    filename: string
    type: string
    language: string | null
    raw_url: string
    size: number
    truncated: boolean
    content: string
}

function isImage (file: IGistFile) {
    return file.type.startsWith('image/') && file.language !== 'SVG'
}

function isFont (file: IGistFile) {
    return file.type.startsWith('font/')
}
