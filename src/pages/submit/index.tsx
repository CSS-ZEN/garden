
import {Head, Fabric, Button, Link, Landing} from 'src/components'
import {useBroadcastChannel, useMonaco} from 'src/hooks'
import {defaultTheme, resetStyle} from 'src/helpers/values'
import debounce from 'src/helpers/debounce'
import {SUBMIT_CHANNEL} from 'src/config'
import style from './submit.module.scss'


export default function Edit () {
    const [state, setState] = useBroadcastChannel(SUBMIT_CHANNEL, defaultTheme)

    const [loading, monaco] = useMonaco({
        value: state.theme,
        language: 'css',
        onChange: debounce((value, e) => {
            setState(prev => ({
                ...prev,
                theme: value,
            }))
        }, 1000),
    })

    const handleSubmit = () => {
        const {editor} = monaco
        if (editor) {
            // TODO: @sy submit to gist
            console.info('value', editor.getValue())
        }
    }

    return (
        <Fabric full clearfix verticle>
            <Head title="Edit | CSS Zen Garden">
                <script src="/monaco-editor/min/vs/loader.js" />
                <style>{resetStyle}</style>
            </Head>

            {loading && <Landing />}

            <Fabric clearfix shrink className={style.toolbar}>
                <Fabric grow />
                <Fabric clearfix>
                    <Button className={style.toolbar__submit} onClick={handleSubmit} label="Submit" />
                    <Link href="/submit/preview" target="_blank"><Button label="Preview" /></Link>
                </Fabric>
            </Fabric>

            <Fabric clearfix grow className={style.editor__wrapper}>
                <div className={style.editor} ref={monaco.container} />
            </Fabric>
        </Fabric>
    )
}
