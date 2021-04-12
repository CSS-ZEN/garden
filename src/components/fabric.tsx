
interface IProps {
    className?: string
    children: any
    clearfix?: boolean
}

export default function Fabric ({
    className: className = '',
    children,
    clearfix = false,
}: IProps) {
    if (clearfix) return (
        <div className={`fabric ${className}`}>
            {children}
        </div>
    )

    return (
        <div className={`fabric ${className}`}>
            <div className="fabric-container">
                {children}
            </div>
        </div>
    )
}
