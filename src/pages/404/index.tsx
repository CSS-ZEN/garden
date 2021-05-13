
import {Head, Fabric, Quote, Button, Link} from 'src/components'

import styles from './404.module.scss'


export default function CountentNotFound () {

    return (
        <Fabric className={styles['f0f-container']} full>
            <Head title="Content Not Found | CSS Zen Garden" />

            <Fabric clearfix className={styles['f0f-container__404']}>
                <hgroup data-word="404">404<Fabric clearfix className={styles['f0f-container__noise']} /></hgroup>
            </Fabric>
            <Fabric><Quote inline quote="远方除了遥远一无所有" author="海子" work="远方" /></Fabric>
            <Fabric clearfix>
                <Button borderless label="Back" onClick={navigateBack} />
                <span>/</span>
                <Link href="/"><Button borderless label="Home" /></Link>
            </Fabric>
        </Fabric>
    )
}

const navigateBack = () => {
    if (history.length) return history.back()
    return location.assign('/')
}
