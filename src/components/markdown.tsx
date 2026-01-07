import {useRef, useEffect} from 'react'
import style from './markdown.module.scss'
import {useClipboard} from 'src/hooks'

export interface IMarkdownProps {
    content: string
}

const octiconLink = `<svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>`
const octiconClippy = `<svg class="octicon octicon-clippy ${style['octicon-clippy']}" viewBox="0 0 16 16" version="1.1" height="16" width="16"><path fill-rule="evenodd" d="M5.75 1a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-4.5zm.75 3V2.5h3V4h-3zm-2.874-.467a.75.75 0 00-.752-1.298A1.75 1.75 0 002 3.75v9.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-9.5a1.75 1.75 0 00-.874-1.515.75.75 0 10-.752 1.298.25.25 0 01.126.217v9.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-9.5a.25.25 0 01.126-.217z"></path></svg>`
const octiconCheck = `<svg class="octicon octicon-check ${style['octicon-check']}" viewBox="0 0 16 16" version="1.1" height="16" width="16"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>`

export default function Markdown (markdown: IMarkdownProps) {
    const $article = useRef<HTMLElement>(null)
    const [, setClipboard] = useClipboard()
    useEffect(() => {
        if (!$article.current) return

        const detachHeaderAnchors = attachHeaderAnchors($article.current)
        const detachPreCopyButton = attachPreCopyButton($article.current, setClipboard)

        return () => {
            detachHeaderAnchors()
            detachPreCopyButton()
        }
    }, [])
    return <article ref={$article} className={style['markdown-body']} dangerouslySetInnerHTML={{__html: markdown.content}} />
}

function attachHeaderAnchors (container: HTMLElement) {
    const headers = container.querySelectorAll('h1, h2, h3, h4, h5, h6')
    headers.forEach(header => {
        const id = bleachElementId(header)
        header.id = id

        const anchor = document.createElement('a')
        anchor.href = `#${id}`
        anchor.className = style['header-anchor']
        anchor.innerHTML = octiconLink
        header.prepend(anchor)
    })

    return () => headers.forEach(header => header.parentNode?.removeChild(header))
}

function attachPreCopyButton (container: HTMLElement, setClipboard: (text: string) => void) {
    const pres = container.querySelectorAll('pre')
    pres.forEach(pre => {
        pre.removeAttribute('style')
        pre.removeAttribute('class')
        const button = document.createElement('div')
        button.setAttribute('role', 'button')
        button.className = style['pre-clippy']
        button.innerHTML = octiconClippy + octiconCheck
        button.addEventListener('click', () => {
            const successClassName = style['pre-clippy--success']
            if (button.classList.contains(successClassName)) return

            setClipboard(pre.textContent || '')
            button.classList.add(successClassName)
            setTimeout(() => button.classList.remove(successClassName), 1000)
        })
        pre.append(button)
    })

    return () => pres.forEach(pre => pre.querySelector('div')?.remove())
}

function bleachElementId (el: Element) {
    return (el.textContent || '').toLowerCase()
        .replace(/\s/g, '-')
        .replace(/^\d+/, '')
        .replace(/(?![\w-])./g, '')
}
