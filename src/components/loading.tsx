import type {ReactNode} from 'react'

interface IProps {
    className?: string
    isLoading: boolean
    children: ReactNode
}

export default function Loading ({
    children,
    isLoading = true,
    className = '',
}: IProps) {
    return (
        <div className={`${className} fabric domino-container`}>
            {
                isLoading ? (
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