
import type {ReactNode} from 'react'
import useBem from 'src/hooks/useBem'

interface IProps {
    className?: string
    children?: ReactNode
    full?: boolean
    clearfix?: boolean
    verticle?: boolean
    grow?: boolean
    shrink?: boolean
}

export default function Fabric ({
    className = '',
    children,
    clearfix = false,
    full = false,
    verticle = false,
    grow = false,
    shrink = false,
}: IProps) {
    const _className = `${className} ` + useBem('fabric', '', {full, verticle, grow, shrink})

    if (clearfix) return (
        <div className={_className}>
            {children}
        </div>
    )

    return (
        <div className={_className}>
            <div className="fabric-container">
                {children}
            </div>
        </div>
    )
}
