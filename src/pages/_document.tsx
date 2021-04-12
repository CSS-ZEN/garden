import {useContext} from 'react'
import Document, {Html, Head, NextScript} from 'next/document'
import {DocumentContext} from 'next/dist/next-server/lib/document-context'
import {AMP_RENDER_TARGET} from 'next/dist/next-server/lib/constants'


const Main = () => {
    const { inAmpMode, html, docComponentsRendered } = useContext(
        DocumentContext
    )

    docComponentsRendered.Main = true
    if (inAmpMode) return <>{AMP_RENDER_TARGET}</>
    return <main id="__next" dangerouslySetInnerHTML={{ __html: html }}></main>
}

export default class MyDocument extends Document {
    render () {
        return (
            <Html>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
