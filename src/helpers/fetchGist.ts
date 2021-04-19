
import {FETCH_GIST_CACHE_LIFETIME} from 'src/config'

import cached from './cached'


export default async function fetchGist (gistid: string) {
    return cached(`fetch:gist:${gistid}`, async () => {
        const url = `https://api.github.com/gists/${gistid}`
        const r = await fetch(url)
        const {status, ok} = r
        const body = await r.json()
        return {ok, status, body}
    }, FETCH_GIST_CACHE_LIFETIME)
}
