import type {ReactNode} from 'react'

interface IProps {
    className?: string
    loading: boolean
    children: ReactNode
}

export default function Loading ({
    children,
    loading = true,
    className = '',
}: IProps) {
    return (
        <div className={`${className} fabric domino-container`}>
            {
                loading ? (
                    <ul className="dominos" aria-busy="true" aria-label="Loading">
                        <li className="domino" />
                        <li className="domino" />
                        <li className="domino" />
                        <li className="domino" />
                        <li className="domino" />
                        <li className="domino" />
                        <li className="domino" />
                    </ul>
                ) : ''
            }
            {children}
        </div>
    )
}