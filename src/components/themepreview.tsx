
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
    const [loading, setLoading] = useState(true)
    const [callIframe, setCallIframe] = useState(false)
    const defaultUrl = `https://${AWS_HOST}/desktop/czg.vercel.app/theme/${id}.jpg`
    const iframeUrl = `/theme/${id}`
    const [src, setSrc] = useState(defaultUrl)

    // const onLoad = () => setBlocked(false)

    const onError = () => {
        if (src.startsWith('/api')) {
            setLoading(true)
            return setCallIframe(true)
        }
        setSrc(`/api/snapshot/${id}`)
    }

    return (
        <Fabric className={`${bem('preview')}`} clearfix verticle grow>
            <Link className={`${bem('preview', 'frame-wrapper')}`} href={`/theme/${id}`} target="_blank">
                <Loading isLoading={loading} className={bem('preview', 'frame')}>
                    {
                        callIframe
                            ? <iframe src={iframeUrl} className={bem('preview', 'iframe')} frameBorder="0" scrolling="no" />
                            // tslint:disable-next-line:jsx-no-lambda
                            : <Image layout="fill" onLoad={e => e.currentTarget.src.indexOf('data:image/gif;base64') < 0 && setLoading(false)} onError={onError} src={src} alt={src} />
                    }
                </Loading>
            </Link>
            <Fabric className={bem('preview', 'title')}><Quote inline quote={manifest.name} author={manifest.author} /></Fabric>
        </Fabric>
    )
}
