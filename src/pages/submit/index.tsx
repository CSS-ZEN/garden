
import {useEffect} from 'react'
import {Head, Fabric, Button, Link} from 'src/components'
import {useBroadcastChannel} from 'src/helpers'


export default function Edit () {
    const [n, setN] = useBroadcastChannel('test-channel', {n: 1, code: ''})

    const handleClick = () => setN(p => ({n: p.n + 1, code: ''}))

    useEffect(() => {
        const {require} = window as ANY
        require.config({paths: {vs: '/monaco-editor/min/vs'}})
        require(['vs/editor/editor.main'], () => {
            const container = document.getElementById('container')
            if (container) monaco.editor.create(container, {
                value: ['* {', '    box-sizing: border-box;', '}'].join('\n'),
                language: 'css',
            })
        })
    }, [])

    return (
        <Fabric>
            <Head title="Edit | CSS Zen Garden">
                <script src="/monaco-editor/min/vs/loader.js" />
            </Head>

            <Fabric clearfix>
                Edit - {n.n}
            </Fabric>

            <Fabric>
                <Button onClick={handleClick} label="+" />
                <div id="container" style={{width: '800px', height: '600px'}} />
            </Fabric>

            <Fabric>
                <Link href="/submit/preview" target="_blank">preview</Link>
            </Fabric>
        </Fabric>
    )
}
