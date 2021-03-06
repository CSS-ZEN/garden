
import {useState, ReactEventHandler} from 'react'
import Image from 'next/image'

import {mbem} from 'src/helpers'
import {useTimer} from 'src/hooks'
import {AWS_HOST} from 'src/config'
import type {IVerboseTheme} from 'src/garden'
import {Fabric, Quote, Link, Icons} from 'src/components'
import Domino from './domino'
import styles from './themepreview.module.scss'


interface IProps {
    theme: IVerboseTheme
    fetching?: boolean
}

const bem = mbem(styles)
const IMAGE_TIMEOUT = 6000

export default function ThemePreview ({theme, fetching = false}: IProps) {
    const {id, manifest, stats} = theme
    const snapshotSrc = `https://${AWS_HOST}/desktop/czg.vercel.app/theme/${id}.jpg`
    const snapshotApiPath = `/api/snapshot/${id}`
    const themePath = `/theme/${id}`

    const [loading, setLoading] = useState(true)
    const [usingIframe, setUsingIframe] = useState(false)

    const onComplete = () => {
        cancelTimer()
        setLoading(false)
    }

    const onError = () => {
        onComplete()
        setUsingIframe(true)
        fetch(snapshotApiPath)
    }

    const cancelTimer = useTimer(onError, IMAGE_TIMEOUT)

    const onLoad: ReactEventHandler<HTMLImageElement> = e => {
        if (e.currentTarget.src.startsWith('data:image/gif;base64')) return
        onComplete()
    }

    if (theme.isSlot) return (
        <Fabric className={`${bem('preview', '', {fetching, fake: true})}`} clearfix verticle grow>
            <Fabric clearfix className={`${bem('preview', 'frame-wrapper')}`}>
                <Fabric className={bem('preview', 'frame')}>
                    <Domino />
                </Fabric>
            </Fabric>
            <Fabric clearfix className={bem('preview-caption')}>
                <Quote inline quote="" author="" />
            </Fabric>
        </Fabric>
    )

    return (
        <Fabric className={`${bem('preview', '', {fetching})}`} clearfix verticle grow>
            <Link className={`${bem('preview', 'frame-wrapper')}`} href={`/theme/${id}`} target="_blank" tabIndex={1}>
                <Fabric className={bem('preview', 'frame')}>
                    {usingIframe
                        ? <iframe src={themePath} className={bem('preview', 'iframe')} frameBorder="0" scrolling="no" tabIndex={-1} />
                        : <Image layout="fill" onLoad={onLoad} onError={onError} src={snapshotSrc} alt={snapshotSrc} />
                    }
                    {(fetching || loading) && <Domino />}
                </Fabric>
            </Link>
            <Fabric clearfix className={bem('preview-caption')}>
                <Quote inline quote={manifest.name} author={manifest.author} />
                <Fabric grow clearfix className={bem('preview-caption', 'stats')}>
                    <Fabric grow clearfix />
                    <Fabric clearfix className={bem('preview-caption', 'stat')}>
                        <Icons.OcticonStar />
                        <code>{stats.stargazerCount}</code>
                    </Fabric>
                    <Fabric clearfix className={bem('preview-caption', 'stat')}>
                        <Icons.OcticonEye />
                        <code>{stats.pv}</code>
                    </Fabric>
                </Fabric>
            </Fabric>
        </Fabric>
    )
}
