import {useState, useEffect, useCallback} from 'react'


const isClipboardApiAvailable = () => !!navigator?.clipboard

const setElementStyle = ($el: HTMLElement, style: Record<string, string>) => {
    Object.entries(style).forEach(([key, value]) => $el.style.setProperty(key, value))
}

const createTextArea = () => {
    const textArea = document.createElement('textarea')
    textArea.setAttribute('cols', '0')
    textArea.setAttribute('rows', '0')
    setElementStyle(textArea, {
        border: 'none',
        outline: 'none',
        margin: '0',
        padding: '0',
        bottom: '0',
        left: '0',
        'margin-bottom': '-1px',
        'margin-left': '-1px',
        height: '1px',
        'max-height': '1px',
        'min-height': '1px',
        position: 'absolute',
        width: '1px',
        'min-width': '1px',
        'max-width': '1px',
    })
    document.body.appendChild(textArea)
    return textArea
}

const readTextArea = () => {
    const textArea = createTextArea()
    textArea.focus()
    const success = document.execCommand('paste')

    if (!success) {
        textArea.remove()
        throw new Error('Permission denied.')
    }
    const value = textArea.value
    textArea.remove()
    return value
}

const writeTextArea = (text: string) => {
    const textArea = createTextArea()
    textArea.value = text
    textArea.select()
    const success = document.execCommand('copy')
    textArea.remove()
    if (!success) throw new Error('Permission denied.')
}

export default function useClipboard (): [string, (clipboard: string) => void] {
    const [clipboard, setClipboard] = useState('')

    useEffect(() => {
        try {
            if (isClipboardApiAvailable()) {
                const textArea = createTextArea()
                textArea.focus()
                navigator.clipboard.readText().then(text => {
                    if (clipboard !== text) setClipboard(text)
                }).catch(console.warn).finally(() => textArea.remove())
            } else {
                const text = readTextArea()
                if (clipboard !== text) setClipboard(text)
            }
        } catch (error) {console.warn(error)}
    }, [])

    useEffect(() => {
        const clipboardListener = () => {
            const fallback = () => {
                try {
                    const selection = document.getSelection()
                    if (selection) setClipboard(selection.toString())
                } catch (error) {console.warn(error)}
            }
            if (isClipboardApiAvailable()) {
                navigator.clipboard.readText().then(text => {
                    if (clipboard !== text) setClipboard(text)
                }).catch(fallback)
            } else fallback()
        }

        document.addEventListener('copy', clipboardListener)
        document.addEventListener('cut', clipboardListener)
        return () => {
            document.removeEventListener('copy', clipboardListener)
            document.removeEventListener('cut', clipboardListener)
        }
    }, [])

    const syncClipboard = useCallback(async (text: string) => {
        const fallback = () => {
            try {
                writeTextArea(text)
                setClipboard(text)
            } catch (error) {console.warn(error)}
        }
        if (isClipboardApiAvailable()) {
            navigator.clipboard.writeText(text).then(() => setClipboard(text)).catch(fallback)
        } else fallback()
    }, [])

    return [clipboard, syncClipboard]
}
