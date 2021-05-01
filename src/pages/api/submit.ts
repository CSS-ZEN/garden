
import type {NextApiRequest, NextApiResponse} from 'next'

import {createGist, HTTPStatusCodes} from 'src/helpers'
import type {IEditTheme} from 'src/helpers/values'


export default (req: NextApiRequest, res: NextApiResponse) => {
    const theme = JSON.parse(req.body) as IEditTheme
    return createGist(theme.files).then(r => {
        const {ok, status, body} = r
        if (ok) {
            theme.id = body.id
            // TODO: @sy theme request
            res.status(HTTPStatusCodes.OK).send(theme)
        } else res.status(status).send(body.message)
    }).catch(err => res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).send(err))
}
