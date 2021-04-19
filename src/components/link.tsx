
import Link from 'next/link'
import {ReactNode} from 'react'


interface IProps {
    href: string
    className?: string
    title?: string
    download?: string
    children: ReactNode
}

export default function CustomLink ({children, href, className, title, download}: IProps) {
    return href.startsWith('/') || href === ''
        ? <Link href={href}><a className={className} title={title} download={download}>{children}</a></Link>
        : <a className={className} title={title} href={href} download={download} target="_blank" rel="noopener">{children}</a>
}
