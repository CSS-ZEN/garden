
import {GetStaticProps, InferGetStaticPropsType} from 'next'

import Fabric from 'src/components/fabric'
import Page from 'src/components/Page'
import Markdown, {IMarkdownProps} from '@csszen/components.markdown'
import markdownToHtml from '@somarlyonks/markdown'

import style from './about.module.scss'


export default function About (markdown: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <Page compact title="About" description="Originates from mezzoblue/csszengarden.com">
            <Fabric className={style['markdown-wrapper']} clearfix>
                <Fabric className={style.markdown} clearfix>
                    <Markdown {...markdown} />
                </Fabric>
            </Fabric>
        </Page>
    )
}

export const getStaticProps: GetStaticProps<IMarkdownProps, {}> = async () => {
    const m0dule = await import('README.md')
    return {
        props: {
            content: await markdownToHtml(m0dule.default),
        },
    }
}
