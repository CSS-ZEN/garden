
export default async function fetchGist (gistid: string) {
    const url = `https://api.github.com/gists/${gistid}`
    const r = await fetch(url, {
        headers: {
            Authorization: 'token ' + process.env.GIST_TOKEN,
        },
    })
    const {status, ok} = r
    const body = await r.json()
    return {ok, status, body}
}
