
interface IProps {
    className?: string
    children: any
    full?: boolean
    clearfix?: boolean
}

export default function Fabric ({
    className: className = '',
    children,
    full = false,
    clearfix = false,
}: IProps) {
    if (clearfix) return (
        <div className={`fabric${full ? ' fabric--full' : ''} ${className}`}>
            {children}
        </div>
    )

    return (
        <div className={`fabric${full ? ' fabric--full' : ''} ${className}`}>
            <div className="fabric-container">
                {children}
            </div>
        </div>
    )
}
