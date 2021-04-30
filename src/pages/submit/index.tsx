
import {useCallback, useState} from 'react'

import {Head, Fabric, Button, Link, Landing} from 'src/components'
import {useBroadcastChannel, useMonaco, useDebounce} from 'src/hooks'
import {defaultTheme, resetStyle} from 'src/helpers/values'
import {SUBMIT_CHANNEL} from 'src/config'
import style from './submit.module.scss'


const BLOCK_INTERVAL = 500 // ms

export default function Edit () {
    const [state, setState] = useBroadcastChannel(SUBMIT_CHANNEL, defaultTheme)
    const [currentFile, setCurrentFile] = useState('theme.css')
    const [debouncing, updateFile] = useDebounce((value, e) => setState(prev => ({
        ...prev,
        theme: value,
        files: prev.files.map(file => file.filename === currentFile ? {
            ...file,
            content: value,
        } : file),
    })), BLOCK_INTERVAL, [currentFile])

    const [loading, monaco] = useMonaco({
        value: state.theme,
        language: 'css',
        onChange: updateFile,
    })

    const handleSubmit = () => {
        const {editor} = monaco
        if (editor) {
            // TODO: @sy submit to gist
            console.info('value', editor.getValue())
        }
    }

    const selectFile = useCallback((filename: string) => {
        const {editor} = monaco
        if (!editor) return

        const file = state.files.find(f => f.filename === filename)
        if (!file) return
        const model = window.monaco.editor.createModel(file.content, file.language.toLowerCase())
        editor.setModel(model)
        setCurrentFile(filename)
    }, [state])

    return (
        <Fabric full clearfix verticle>
            <Head title="Edit | CSS Zen Garden">
                <script src="/monaco-editor/min/vs/loader.js" />
                <style>{resetStyle}</style>
            </Head>

            {loading && <Landing />}

            <Fabric clearfix shrink className={style.toolbar}>
                <Fabric clearfix>
                    {state.files.map(file =>
                        <FileTab key={file.filename} filename={file.filename} active={file.filename === currentFile} onClick={selectFile} />
                    )}
                </Fabric>
                <Fabric grow />
                <Fabric clearfix>
                    <Button className={style.toolbar__submit} loading={debouncing} onClick={handleSubmit} label="Submit" />
                    <Link href="/submit/preview" target="_blank"><Button label="Preview" /></Link>
                </Fabric>
            </Fabric>

            <Fabric clearfix grow className={style.editor__wrapper}>
                <div className={style.editor} ref={monaco.container} />
            </Fabric>
        </Fabric>
    )
}

function FileTab ({filename, active, onClick}: {
    filename: string
    active: boolean
    onClick: (key: string) => void
}) {
    const clickHandler = useCallback(() => onClick(filename), [onClick, filename])

    return <Button borderless className={active ? style['toolbar__file--active'] : ''} label={filename} onClick={clickHandler} />
}
