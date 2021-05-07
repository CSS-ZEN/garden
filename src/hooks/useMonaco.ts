
import {RefObject, useEffect, useRef, useState} from 'react'

interface IMonacoConsumer {
    container: RefObject<HTMLDivElement>,
    editor: monaco.editor.IStandaloneCodeEditor | null
}

/**
 * @description add
 *
 * `<script src="/monaco-editor/min/vs/loader.js" />`
 *
 * to head before use it
 */
export default function useMonaco (options: monaco.editor.IStandaloneEditorConstructionOptions & {
    onChange?: (value: string, e: monaco.editor.IModelContentChangedEvent) => void
} = {}): [boolean, IMonacoConsumer] {
    const [loading, setLoading] = useState(true)
    const container = useRef<HTMLDivElement>(null)
    const ref = useRef<IMonacoConsumer>({
        container,
        editor: null,
    })

    useEffect(() => {
        const {require} = window as ANY
        require.config({paths: {vs: '/monaco-editor/min/vs'}})

        const listeners: monaco.IDisposable[] = []

        require(['vs/editor/editor.main'], () => {
            if (container.current) {
                const editor = monaco.editor.create(container.current, options)
                ref.current.editor = editor

                const {onChange} = options
                if (onChange) {
                    listeners.push(editor.onDidChangeModelContent(e => onChange(editor.getValue(), e)))
                }
            }
            setLoading(false)
        })

        return () => {
            if (ref.current.editor) ref.current.editor.dispose()
            listeners.forEach(listener => listener.dispose())
        }
    }, [])

    return [loading, ref.current]
}
