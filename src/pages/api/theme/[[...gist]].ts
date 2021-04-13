// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type {NextApiRequest, NextApiResponse} from 'next'


const DEFAULT_THEME_ID = 'f4b657c4e3b99c63281b079f66d4dc34'
const DEFAULT_THEME_FILE = 'theme.css'

async function fetchGist (gistid) {
    const url = `https://api.github.com/gists/${gistid}`
    const r = await fetch(url)
    const {status, ok} = r
    const body = await r.json()
    return {ok, status, body}
}

export default (req: NextApiRequest, res: NextApiResponse) => {
    const {gist = []} = req.query
    const gistid = gist[0] || DEFAULT_THEME_ID
    const filename = gist[1] || DEFAULT_THEME_FILE

    fetchGist(gistid).then(r => {
        const {ok, status, body} = r
        if (ok) {
            if (body.files && body.files[filename]) {
                const file = body.files[filename]
                if (filename.endsWith('.css')) {
                    res.setHeader('Content-Type', 'text/css')
                }
                res.status(200).send(file.content)
            } else res.status(404).send('Content Not Found')
        } else res.status(status).send(body.message)
    }).catch(err => res.status(500).send(err))
}
