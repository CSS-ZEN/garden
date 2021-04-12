// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type {NextApiRequest, NextApiResponse} from 'next'


export default (req: NextApiRequest, res: NextApiResponse) => {
    const {gistid} = req.query
    const url = `https://api.github.com/gists/${gistid}`

    fetch(url).then(r => r.ok
        ? r.json().then(body => {
            if (body.files && body.files['theme.css']) {
                res.setHeader('Content-Type', 'text/css')
                res.status(200).send(body.files['theme.css'].content)
            }
            else res.status(500).end()
        })
        : r.json().then(body => res.status(r.status).send(body.message))
    ).catch(err => res.status(500).send(err))
}
