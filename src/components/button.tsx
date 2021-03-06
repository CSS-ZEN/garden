
import Fabric from './fabric'
import {useBem} from 'src/hooks'


interface IButtonProps {
    type?: 'button' | 'submit' | 'reset'
    name?: string
    label?: string
    loading?: boolean
    disabled?: boolean
    className?: string
    labelClassName?: string
    primary?: boolean
    borderless?: boolean
    onClick?: JSX.IntrinsicElements['button']['onClick']
}


export default function Button ({
    type = 'button',
    name,
    label,
    loading = false,
    disabled = false,
    className = '',
    labelClassName = '',
    onClick,
    primary = false,
    borderless = false,
}: IButtonProps) {
    return (
        <button
            type={type}
            name={name}
            className={useBem('fabric-button', '', {primary, borderless}) + ` ${className}`}
            disabled={disabled || loading}
            onClick={onClick}
        >
            <Fabric clearfix>
                <span className={'fabric-button__label ' + labelClassName}>{label}</span>
            </Fabric>
        </button>
    )
}
