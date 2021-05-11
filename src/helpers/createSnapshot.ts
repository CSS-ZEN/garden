
export default async function createSnapshot(gistsid:string) {
    let username = process.env.USERNAME;
    let password = process.env.PASSWORD;
    let auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
    await fetch(`${process.env.SNAPSHOT_SERVER}/api/snapshot/desktop?url=https://czg.vercel.app/theme/${gistsid}`, {
        headers: { Authorization: auth}
    })
}