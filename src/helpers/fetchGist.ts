
export default async function fetchGist (gistid) {
    const url = `https://api.github.com/gists/${gistid}`
    const r = await fetch(url)
    const {status, ok} = r
    const body = await r.json()
    return {ok, status, body}
}
