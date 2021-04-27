
import {Head, Fabric, Button, Link} from 'src/components'
import {useBroadcastChannel} from 'src/helpers'


export default function Edit () {
    const [n, setN] = useBroadcastChannel('test-channel', {n: 1})

    const handleClick = () => setN(p => ({n: p.n + 1}))

    return (
        <Fabric>
            <Head title="Edit | CSS Zen Garden" />

            <Fabric clearfix>
                Edit - {n.n}
            </Fabric>

            <Fabric>
                <Button onClick={handleClick} label="+" />
            </Fabric>

            <Fabric>
                <Link href="/submit/preview" target="_blank">preview</Link>
            </Fabric>
        </Fabric>
    )
}
