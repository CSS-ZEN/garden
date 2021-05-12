import styles from './preview.module.scss'
import {AWSHOST} from 'src/config'
import {IThemeManifest} from 'src/garden'

interface IPreviewProps {
    className?: string
    manifest: IThemeManifest,
    gistsid: string
}


export default function ThemePreview ({manifest, gistsid, className = ''}: IPreviewProps) {
    const src = `https://${AWSHOST}/desktop/czg.vercel.app/theme/${gistsid}.jpg`
    return (
        <div className={className}>
            <ul className={`${styles.gallery} ${styles['gallery-margin']}`}>
                <li className={`${styles.thumb} ${styles['browser-frame']}`} id={`/theme/${gistsid}`}>
                    <a href={`/theme/${gistsid}`}>
                        <div className={styles['project-frame']}>
                            <img src={src} alt="" />
                        </div>
                    </a>
                    <p className={styles['thumb-caption']}>{manifest.name} By {manifest.author}</p>
                </li>
            </ul>
        </div>
    )
}