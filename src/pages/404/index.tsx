
import {Head, Fabric, Quote, Button} from 'src/components'

import styles from './404.module.scss'


export default function CountentNotFound () {

    return (
        <Fabric className={styles['f0f-container']} full>
            <Head title="Content Not Found | CSS Zen Garden" />
            <div className="relative"><hgroup data-word="404">404<div className="noise" /></hgroup></div>
            <Fabric><Quote inline quote="远方除了遥远一无所有" author="海子" work="远方" /></Fabric>
            <Fabric clearfix>
                <Button borderless label="Back" onClick={navigateBack} />
                <span>/</span>
                <a href="/"><Button borderless label="Home" /></a>
            </Fabric>
        </Fabric>
    )
}

const navigateBack = () => {
    if (history.length) return history.back()
    return location.assign('/')
}
