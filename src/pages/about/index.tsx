
import {GetStaticProps, InferGetStaticPropsType} from 'next'

import Head from 'src/components/head'
import Fabric from 'src/components/fabric'
import Markdown, {IMarkdown} from 'src/components/markdown'
import markdownToHtml from 'src/helpers/markdownToHtml'
import style from './about.module.scss'


export default function About (markdown: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <Fabric className={style['markdown-wrapper']} clearfix>
            <Fabric className={style.markdown} clearfix>
                <Head title="About | CSS Zen Garden" description="Originates from mezzoblue/csszengarden.com" />
                <Markdown {...markdown} />
            </Fabric>
        </Fabric>
    )
}

export const getStaticProps: GetStaticProps<IMarkdown, {}> = async () => {
    const m0dule = await import('README.md')
    return {
        props: {
            content: await markdownToHtml(m0dule.default),
        },
    }
}
