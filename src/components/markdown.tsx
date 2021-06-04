
import {useEffect, useRef} from 'react'
import style from './markdown.module.scss'


export interface IMarkdown {
    content: string
}

const octiconLink = `<svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>`

export default function Markdown (markdown: IMarkdown) {
    const $article = useRef<HTMLElement>(null)
    useEffect(() => {
        if (!$article.current) return

        const headers = $article.current.querySelectorAll('h2')

        headers.forEach(header => {
            const id = bleachElementId(header)
            header.id = id

            const anchor = document.createElement('a')
            anchor.href = `#${id}`
            anchor.className = style['header-anchor']
            anchor.innerHTML = octiconLink
            header.prepend(anchor)
        })

        return () => {
            headers.forEach(header => header.parentNode?.removeChild(header))
        }
    }, [])
    return <article ref={$article} className={style['markdown-body']} dangerouslySetInnerHTML={{__html: markdown.content}} />
}

function bleachElementId (el: HTMLElement) {
    return (el.textContent || '').toLowerCase()
        .replace(/\s/g, '-')
        .replace(/^\d+/, '')
        .replace(/(?![\w-])./g, '')
}
