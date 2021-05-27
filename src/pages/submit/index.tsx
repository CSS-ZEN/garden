
import {useCallback, useState, Dispatch, SetStateAction} from 'react'

import {Head, Fabric, Button, Link, Landing} from 'src/components'
import {useBroadcastChannel, useMonaco, useDebounce, useSearchParam, useBlocked} from 'src/hooks'
import {safeReadJson, compileSass} from 'src/helpers'
import {defaultTheme, defaultScssThemeFile, resetStyle, IGistFile} from 'src/helpers/values'
import {SUBMIT_CHANNEL, DEFAULT_THEME_FILE} from 'src/config'
import manifestSchema from 'public/manifest-schema.json'

import style from './submit.module.scss'
import type {IThemeManifest} from 'src/garden'


const BLOCK_INTERVAL = 500 // ms
const DEFAULT_THEME_SCSS_FILE = 'theme.scss'

export default function Edit () {
    const [state, setState] = useBroadcastChannel(SUBMIT_CHANNEL, defaultTheme)
    const [currentFile, setCurrentFile] = useState(DEFAULT_THEME_FILE)
    const [debouncing, updateFile] = useDebounce(
        useCallback(value => handleMonacoValueChange(currentFile, value, setState), [currentFile]),
        BLOCK_INTERVAL
    )

    const [editorLoading, monaco] = useMonaco({
        value: state.theme,
        language: 'css',
        onChange: updateFile,
    })

    const [gistLoading, setGistLoading] = useState(true)
    useSearchParam(['theme'], async id => {
        if (!id) return setGistLoading(false)

        try {
            const gist = await fetch(`/api/gists/${id}`).then(r => r.json())
            const manifest = safeReadJson(gist.files['manifest.json'].content, defaultTheme.manifest)
            setState({
                id: gist.id,
                theme: gist.files[DEFAULT_THEME_FILE].content,
                manifest,
                files: gist.files,
            })

            await new Promise(resolve => function detect () {
                if (monaco.editor) resolve(undefined)
                else setTimeout(detect, 100)
            }())

            const filename = manifest.config?.language === 'scss' ? DEFAULT_THEME_SCSS_FILE : DEFAULT_THEME_FILE
            const file = gist.files[filename]
            setMonacoFile(monaco.editor, file)
            setCurrentFile(filename)
        } catch (err) {
            console.error(err)
        } finally {
            setGistLoading(false)
        }
    })

    const [submitting, submit] = useBlocked(async () => {
        const r2 = await fetch('/api/gists', {
            method: 'POST',
            body: JSON.stringify(state),
        }).then(r => r.json())
        window.history.pushState({}, '', `?theme=${r2.id}`)
    }, [state])

    const selectFile = useCallback((filename: string) => {
        const file = state.files[filename]
        if (!file) return

        setMonacoFile(monaco.editor, file)
        setCurrentFile(filename)
    }, [state])

    return (
        <Fabric full clearfix verticle>
            <Head title="Edit">
                <script src="/sass.js/sass.js" />
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

    return (
        <Button
            borderless
            className={active ? style['toolbar__file--active'] : ''}
            label={filename}
            onClick={clickHandler}
        />
    )
}

function setMonacoFile (editor: monaco.editor.IStandaloneCodeEditor | null, file: IGistFile) {
    if (!editor || !window.monaco) return

    const language = file.language.toLowerCase()
    const uri = monaco.Uri.parse(file.filename)
    const model = window.monaco.editor.createModel(file.content, language, uri)
    if (file.filename === 'manifest.json') {
        window.monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            validate: true,
            schemas: [{
                uri: 'https://czg.vercel.app/manifest-schema.json',
                fileMatch: [uri.toString()],
                schema: manifestSchema,
            }],
        })
    }

    editor.getModel()?.dispose()
    editor.setModel(model)
}

async function handleMonacoValueChange (
    filename: string,
    value: string,
    setState: Dispatch<SetStateAction<typeof defaultTheme>>
) {
    const scssResult = filename === DEFAULT_THEME_SCSS_FILE ? await compileSass({filename, content: value}) : null
    if (scssResult && scssResult.status) return console.error(scssResult.formatted)

    setState(prev => {
        const theme = filename === DEFAULT_THEME_SCSS_FILE
            ? scssResult!.text
            : filename === DEFAULT_THEME_FILE ? value : prev.theme
        const files = {
            ...prev.files,
            [filename]: {
                ...prev.files[filename],
                content: value,
            },
        }

        if (filename === DEFAULT_THEME_SCSS_FILE) {
            files[DEFAULT_THEME_FILE] = {
                ...prev.files[DEFAULT_THEME_FILE],
                content: theme,
            }
        } else if (filename === 'manifest.json') {
            const manifest = safeReadJson<IThemeManifest>(value, defaultTheme.manifest)
            if (manifest.config?.language === 'scss' && !prev.files[DEFAULT_THEME_SCSS_FILE]) {
                files[DEFAULT_THEME_SCSS_FILE] = defaultScssThemeFile
            }
        }

        return {
            ...prev,
            theme,
            files,
        }
    })
}
