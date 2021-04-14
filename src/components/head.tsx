
import Head from 'next/head'

interface IProps {
    title: string
    description?: string
    author?: string
    children?: any
}

const CustomHead = ({title, author = 'csszen', description, children}: IProps) => (
    <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />

        <meta name="author" content={author} />
        {description && <meta name="description" content={description} />}
        <meta name="robots" content="all" />

        {children}
    </Head>
)

export default CustomHead
