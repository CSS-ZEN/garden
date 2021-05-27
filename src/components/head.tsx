
import Head from 'next/head'
import {ReactNode} from 'react'


interface IProps {
    title: string
    description?: string
    author?: string
    children?: ReactNode
}

export default function CustomHead ({title, author = 'csszen', description, children}: IProps) {
    return (
        <Head>
            <title>{title} | CSS Zen Garden</title>
            <link rel="icon" href="/favicon.ico" />

            <meta name="author" content={author} />
            {description && <meta name="description" content={description} />}
            <meta name="robots" content="all" />

            {children}
        </Head>
    )
}
