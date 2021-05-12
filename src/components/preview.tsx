import {useState} from 'react'
import {AWSHOST} from 'src/config'
import {IThemeManifest} from 'src/garden'
import styles from './preview.module.scss'

interface IPreviewProps {
    className?: string
    manifest: IThemeManifest,
    gistsid: string
}


export default function ThemePreview ({manifest, gistsid, className = ''}: IPreviewProps) {
    const [src, setSrc] = useState(`https://${AWSHOST}/desktop/czg.vercel.app/theme/${gistsid}.jpg`)
    let errored = true
    const onError = () => {
        if (errored) {
            setSrc(`_next/image?url=/api/snapshot/${gistsid}&w=1920&q=75`)
            errored = true
        }
    }

    return (
        <div className={className}>
            <ul className={`${styles.gallery} ${styles['gallery-margin']}`}>
                <li className={`${styles.thumb} ${styles['browser-frame']}`} id={`/theme/${gistsid}`}>
                    <a href={`/theme/${gistsid}`}>
                        <div className={styles['project-frame']}>
                            {/* <Image layout="fill" src={src} alt={src} /> */}
                            <img onError={onError} src={src} alt={src} />
                        </div>
                    </a>
                    <p className={styles['thumb-caption']}>{manifest.name} By {manifest.author}</p>
                </li>
            </ul>
        </div>
    )
}