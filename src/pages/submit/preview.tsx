
import {Head, Fabric} from 'src/components'
import {useBroadcastChannel} from 'src/helpers'


export default function Preview () {
    const [n] = useBroadcastChannel('test-channel', {n: 1})

    return (
        <Fabric>
            <Head title="Preview | CSS Zen Garden" />

            <Fabric clearfix>
                Preview - {n.n}
            </Fabric>
        </Fabric>
    )
}
