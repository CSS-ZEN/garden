
export default async function createGist (files: Record<string, {
    filename: string,
    content: string,
}>) {
    const r = await fetch('https://api.github.com/gists', {
        method: 'POST',
        headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: 'Basic ' + Buffer.from(`csszen-bot:${process.env.STASH_GIST_TOKEN}`).toString('base64'),
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
