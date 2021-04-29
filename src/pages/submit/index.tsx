
import {Head, Fabric, Button, Link, Landing} from 'src/components'
import {useBroadcastChannel, useMonaco} from 'src/hooks'
import {defaultTheme} from 'src/helpers/values'
import {SUBMIT_CHANNEL} from 'src/config'
import style from './submit.module.scss'


export default function Edit () {
    const [state, setState] = useBroadcastChannel(SUBMIT_CHANNEL, defaultTheme)

    const [loading, monaco] = useMonaco({
        value: state.theme,
        language: 'css',
        onChange (value, e) {
            // TODO: @sy debounce
            setState(prev => ({
                ...prev,
                theme: value,
            }))
        },
    })

    const handleSubmit = () => {
        const {editor} = monaco
        if (editor) {
            // TODO: @sy submit to gist
            console.info('value', editor.getValue())
        }
    }

    return (
        <Fabric>
            <Head title="Edit | CSS Zen Garden">
                <script src="/monaco-editor/min/vs/loader.js" />
            </Head>

            {loading && <Landing />}

            <Fabric>
                <div className={style.editor} ref={monaco.container} />
            </Fabric>

            <Fabric>
                <Button onClick={handleSubmit} label="Submit" />
                <Link href="/submit/preview" target="_blank"><Button label="Preview" /></Link>
            </Fabric>
        </Fabric>
    )
}
