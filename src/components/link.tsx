
import NextLink from 'next/link'
import {ReactNode} from 'react'


interface IProps {
    href: string
    children: ReactNode
}

export default function Link ({children, href}: IProps) {
    return href.startsWith('/') || href === ''
        ? <NextLink href={href}><a>{children}</a></NextLink>
        : <a href={href} target="_blank" rel="noopener">{children}</a>
}
