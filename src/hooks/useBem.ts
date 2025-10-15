
import {useMemo} from 'react'

type IModifier = string | undefined | false
type IModifiers = IModifier[] | Record<string, IModifier | true>

interface IElementBuilder {
    (element: string, modifiers: IModifiers): string
}

export function bem (block: string): IElementBuilder
export function bem (block: string, element: string, modifiers: IModifiers): string
export function bem (block: string, element?: string, modifiers: IModifiers = []): string | IElementBuilder {
    function elementBuilder (_element: string, _modifiers: IModifiers = []): string {
        const prefix = `${block}${_element ? '__' + _element : ''}`

        if (!Array.isArray(_modifiers)) {
            _modifiers = Object.entries(_modifiers).map(([k, v]) => !!v && k)
        }

        return [prefix].concat(
            _modifiers.filter(m => m).map(modifier => `${prefix}--${modifier}`),
        ).join(' ')
    }
    if (arguments.length === 1) return elementBuilder
    return elementBuilder(element!, modifiers)
}



export default function useBem (
    block: string,
    element: string,
    modifiers: IModifiers = [],
    inputs: React.DependencyList = []
) {
    if (arguments.length === 3) {
        inputs = Array.isArray(modifiers) ? [] : Object.values(modifiers)
    }

    return useMemo(() => bem(block, element, modifiers), inputs)
}
