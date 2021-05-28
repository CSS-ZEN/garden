
import {ReactNode} from 'react'

import {resetStyle} from 'src/helpers/values'

import Head from './head'
import Header from './header'
import Footer from './footer'


interface IProps {
    title: string
    compact?: boolean
    description?: string
    children?: ReactNode
}

export default function Page ({title, compact, description, children}: IProps) {
    return (
        <>
            <Head title={title} description={description}>
                <style>{resetStyle}</style>
            </Head>
            <Header title={title} compact={compact} />
            {children}
            <Footer compact={compact} />
        </>
    )
}
