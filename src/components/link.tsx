
import Link from 'next/link'
import {ReactNode} from 'react'


interface IProps {
    href: string
    className?: string
    title?: string
    children: ReactNode
}

export default function CustomLink ({children, href, className, title}: IProps) {
    return href.startsWith('/') || href === ''
        ? <Link href={href}><>{children}</></Link>
        : <a className={className} title={title} href={href} target="_blank" rel="noopener">{children}</a>
}
