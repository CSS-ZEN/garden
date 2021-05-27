
import type {ReactNode} from 'react'

import Fabric from './fabric'

interface IProps {
    children?: ReactNode
    className?: string
}


export default function Domino ({children = null, className = ''}: IProps) {
    return (
        <Fabric className={`domino-container ${className}`} full>
            <p className="domino-description domino-description--scrawcrow">{children}</p>
            <ul className="dominos" aria-busy="true" aria-label="loading">
                <li className="domino" />
                <li className="domino" />
                <li className="domino" />
                <li className="domino" />
                <li className="domino" />
                <li className="domino" />
                <li className="domino" />
            </ul>
            <p className="domino-description">{children}</p>
        </Fabric>
    )
}
