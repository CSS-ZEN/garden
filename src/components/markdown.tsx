
import style from './markdown.module.scss'


export interface IMarkdown {
    content: string
}

export default function Markdown (markdown: IMarkdown) {
    return <article className={style['markdown-body']} dangerouslySetInnerHTML={{__html: markdown.content}} />
}
