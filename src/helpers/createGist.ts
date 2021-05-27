
import type {IBasicFile} from 'src/helpers/values'


export default async function createGist (files: Record<string, IBasicFile>) {
    const r = await fetch('https://api.github.com/gists', {
        method: 'POST',
        headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: 'token ' + process.env.STASH_GIST_TOKEN,
        },
        body: JSON.stringify({
            files,
            public: true,
        }),
    })

    const {status, ok} = r
    const body = await r.json()
    return {ok, status, body}
}
