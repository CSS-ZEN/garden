
import {Head, Fabric} from 'components'
import {noTheme} from 'hooks'


export default function All () {
    noTheme()

    return (
        <Fabric>
            <Head title="All Designs | CSS Zen Garden" />

            <Fabric clearfix>
                All Designs
            </Fabric>
        </Fabric>
    )
}
