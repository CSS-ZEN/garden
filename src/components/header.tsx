
import {ReactNode} from 'react'

import Enso from 'src/components/icons/Enso'
import Fabric from './fabric'


interface IProps {
    title: string
    children?: ReactNode
}

export default function Header ({title, children}: IProps) {
    return (
        <Fabric className="header" clearfix>
            <Enso className="header__logo" />
            <h1 className="header__title">{title}</h1>
            {children}
        </Fabric>
    )
}
