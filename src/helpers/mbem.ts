
type IModifier = string | undefined | false

type IModifiers = IModifier[] | Record<string, IModifier | true>


export default function mBem (styles: {readonly [key: string]: string}) {
    return (block: string, element: string = '', modifiers: IModifiers = []) => {
        const prefix = `${block}${element ? '__' + element : ''}`

        if (!Array.isArray(modifiers)) {
            modifiers = Object.entries(modifiers).map(([k, v]) => !!v && k)
        }

        return [prefix].concat(
            modifiers.filter(m => m).map(modifier => `${prefix}--${modifier}`)
        ).map(key => styles[key]).join(' ')
    }
}
