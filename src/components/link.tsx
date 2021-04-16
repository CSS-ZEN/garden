
import Link from 'next/link'
import {ReactNode} from 'react'


interface IProps {
    href: string
    children: ReactNode
}

export default function CustomLink ({children, href}: IProps) {
    return href.startsWith('/') || href === ''
        ? <Link href={href}><a>{children}</a></Link>
        : <a href={href} target="_blank" rel="noopener">{children}</a>
}
