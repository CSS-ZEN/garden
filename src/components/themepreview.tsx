
import {useState} from 'react'

import {AWS_HOST} from 'src/config'
import {Fabric, Quote} from 'src/components'
import type {ITheme} from 'src/garden'
import Link from './link'

import styles from './themepreview.module.scss'


export default function ThemePreview ({theme}: {theme: ITheme}) {
    const {id, manifest} = theme

    const [src, setSrc] = useState(`https://${AWS_HOST}/desktop/czg.vercel.app/theme/${id}.jpg`)
    const onError = () => setSrc(`_next/image?url=/api/snapshot/${id}&w=1920&q=75`)

    return (
        <Fabric className={`${styles.preview}`} clearfix verticle grow>
            <Link className={`${styles['preview__frame-wrapper']}`} href={`/theme/${id}`} target="_blank">
                <Fabric className={styles.preview__frame}>
                    <img onError={onError} src={src} alt={src} />
                </Fabric>
            </Link>
            <Fabric><Quote inline quote={manifest.name} author={manifest.author} /></Fabric>
        </Fabric>
    )
}
