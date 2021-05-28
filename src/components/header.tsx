
import {ReactNode} from 'react'

import Enso from 'src/components/icons/Enso'
import useBem from 'src/hooks/useBem'

import Fabric from './fabric'


interface IProps {
    compact?: boolean
    title: string
    children?: ReactNode
}

export default function Header ({title, children, compact}: IProps) {
    return (
        <Fabric className={useBem('header', '', {compact})} clearfix>
            <Fabric className="header__content" clearfix grow>
                <Enso className="header__logo" />
                <nav className="header__title">{title}</nav>
                {children || <Fabric grow />}
            </Fabric>
        </Fabric>
    )
}
