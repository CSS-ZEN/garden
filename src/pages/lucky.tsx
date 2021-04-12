
import {Head, Fabric} from 'components'
import {noTheme} from 'hooks'


export default function Lucky () {
    noTheme()

    return (
        <Fabric>
            <Head title="Lucky | CSS Zen Garden" />

            <Fabric clearfix>
                Lucky
            </Fabric>
        </Fabric>
    )
}
