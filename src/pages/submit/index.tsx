
import {useCallback, useState} from 'react'

import {Head, Fabric, Button, Link, Landing} from 'src/components'
import {useBroadcastChannel, useMonaco, useDebounce, useSearchParam, useBlocked} from 'src/hooks'
import {safeReadJson} from 'src/helpers'
import {defaultTheme, resetStyle} from 'src/helpers/values'
import {SUBMIT_CHANNEL, DEFAULT_THEME_FILE} from 'src/config'

import style from './submit.module.scss'


const BLOCK_INTERVAL = 500 // ms

export default function Edit () {
    const [state, setState] = useBroadcastChannel(SUBMIT_CHANNEL, defaultTheme)
    const [currentFile, setCurrentFile] = useState(DEFAULT_THEME_FILE)
    const [debouncing, updateFile] = useDebounce(useCallback((value, e) => setState(prev => ({
        ...prev,
        theme: currentFile === DEFAULT_THEME_FILE ? value : prev.theme,
        files: {
            ...prev.files,
            [currentFile]: {
                ...prev.files[currentFile],
                content: value,
            },
        },
    })), [currentFile]), BLOCK_INTERVAL)

    const [editorLoading, monaco] = useMonaco({
        value: state.theme,
        language: 'css',
        onChange: updateFile,
    })

    const [gistLoading, setGistLoading] = useState(true)
    useSearchParam(['theme'], async id => {
        if (!id) return setGistLoading(false)

        try {
            const r = await fetch(`/api/gists/${id}`)
            const gist = await r.json()
            setState({
                id: gist.id,
                theme: gist.files[DEFAULT_THEME_FILE].content,
                manifest: safeReadJson(gist.files['manifest.json'].content, defaultTheme.manifest),
                files: gist.files,
            })

            await new Promise(resolve => function detect () {
                if (monaco.editor) resolve(undefined)
                else setTimeout(detect, 100)
            }())

            if (gist.files[currentFile]) monaco.editor?.setValue(gist.files[currentFile].content)
            else {
                const file = gist.files[DEFAULT_THEME_FILE]
                setMonacoModel(monaco.editor, file.content, file.language.toLowerCase())
                setCurrentFile(DEFAULT_THEME_FILE)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setGistLoading(false)
        }
    })

    const [submitting, submit] = useBlocked(async () => {
        const r = await fetch('/api/gists', {
            method: 'POST',
            body: JSON.stringify(state),
        })
        const r2 = await r.json()
        window.history.pushState({}, '', `?theme=${r2.id}`)
    }, [state])

    const selectFile = useCallback((filename: string) => {
        const file = state.files[filename]
        if (!file) return

        setMonacoModel(monaco.editor, file.content, file.language.toLowerCase())
        setCurrentFile(filename)
    }, [state])

    return (
        <Fabric full clearfix verticle>
            <Head title="Edit | CSS Zen Garden">
                <script src="/monaco-editor/min/vs/loader.js" />
                <style>{resetStyle}</style>
            </Head>

            {(editorLoading || gistLoading) && <Landing />}

            <Fabric clearfix shrink className={style.toolbar}>
                <Fabric clearfix>
                    {Object.values(state.files).map(file =>
                        <FileTab key={file.filename} filename={file.filename} active={file.filename === currentFile} onClick={selectFile} />
                    )}
                </Fabric>
                <Fabric grow />
                <Fabric clearfix>
                    <Button className={style.toolbar__submit} disabled={debouncing} loading={submitting} onClick={submit} label="Submit" />
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

function setMonacoModel (editor: monaco.editor.IStandaloneCodeEditor | null, content: string, language?: string) {
    if (!editor || !window.monaco) return

    const model = window.monaco.editor.createModel(content, language)
    editor.getModel()?.dispose()
    editor.setModel(model)
}
