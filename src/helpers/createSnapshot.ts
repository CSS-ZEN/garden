import {SNAPSHOT_SERVER} from 'src/config'

interface ISnapshot {
    gistid: string
    mode?: 'desktop' | 'mobile'
}

export default async function createSnapshot ({gistid, mode='desktop'}:ISnapshot) {
    const username = process.env.SNAPSHOT_USERNAME
    const password = process.env.SNAPSHOT_PASSWORD
    const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
    return await fetch(`${SNAPSHOT_SERVER}/api/snapshot/${mode}?url=https://czg.vercel.app/theme/${gistid}`, {
        headers: {Authorization: auth},
    })
}