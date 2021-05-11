import styles from './preview.module.scss'
interface IPreviewProps {
    className?: string
    description: string,
    gistsid: string
}


export default function ThemePreview ({description, gistsid, className = ''}: IPreviewProps) {
    const src = `https://${process.env.NEXT_AWSHOST}/desktop/czg.vercel.app/theme/${gistsid}.jpg`
    return <div className={className}>
        <ul className={`${styles['gallery']} ${styles['gallery-margin']}`}>
            <li className={`${styles['thumb']} ${styles['browser-frame']}`} id={`/theme/${gistsid}`}>
                <a href={`/theme/${gistsid}`}>
                    <div className={styles['project-frame']}>
                        <img src={src} alt=""></img>
                    </div>
                </a>
                <p className={styles['thumb-caption']}>{description}</p>
            </li>
        </ul>
    </div>
}