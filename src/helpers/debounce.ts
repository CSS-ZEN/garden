
export default function debounce<T extends (...args: ANY[]) => ANY> (f: T, time: number) {
    let debounced: null | ReturnType<typeof setTimeout> = null
    return function (...args: ANY[]) {
        // @ts-ignore
        // tslint:disable-next-line: no-invalid-this
        const actor = () => f.apply(this, args)
        if (debounced) clearTimeout(debounced)
        debounced = setTimeout(actor, time)
    } as T
}
