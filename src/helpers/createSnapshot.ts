import {SNAPSHOT_SERVER} from 'src/config'


export default async function createSnapshot (gistsid: string) {
    const username = process.env.SNAPSHOT_USERNAME
    const password = process.env.SNAPSHOT_PASSWORD
    const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
    await fetch(`${SNAPSHOT_SERVER}/api/snapshot/desktop?url=https://czg.vercel.app/theme/${gistsid}`, {
        headers: {Authorization: auth},
    })
}