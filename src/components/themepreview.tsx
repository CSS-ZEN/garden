
import {useState} from 'react'
import Image from 'next/image'
import {mbem} from 'src/helpers'
import {AWS_HOST} from 'src/config'
import type {ITheme} from 'src/garden'
import {Fabric, Quote, Link} from 'src/components'
import Loading from './loading'
import styles from './themepreview.module.scss'

const bem = mbem(styles)

export default function ThemePreview ({theme}: {theme: ITheme}) {
    const {id, manifest} = theme
    const [isLoading, setisLoading] = useState(true)

    const defaultUrl = `https://${AWS_HOST}/desktop/czg.vercel.app/theme/${id}.jpg`

    const [src, setSrc] = useState(defaultUrl)
    const onError = () => setSrc(`/api/snapshot/${id}`)
    const onLoad = () => setisLoading(false)

    return (
        <Fabric className={`${bem('preview')}`} clearfix verticle grow>
            <Link className={`${bem('preview', 'frame-wrapper')}`} href={`/theme/${id}`} target="_blank">
                <Loading isLoading={isLoading} className={bem('preview', 'frame')} >
                    <Image layout="fill" onLoad={onLoad} onError={onError} src={src} alt={src} />
                </Loading>
            </Link>
            <Fabric className={bem('preview', 'title')}><Quote inline quote={manifest.name} author={manifest.author} /></Fabric>
        </Fabric>
    )
}
