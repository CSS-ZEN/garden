
export default function debounce<T extends (...args: ANY[]) => ANY> (f: T, ms: number) {
    let debounced: null | ReturnType<typeof setTimeout> = null
    return ((...args: ANY[]) => {
        if (debounced) clearTimeout(debounced)
        debounced = setTimeout(() => f(...args), ms)
    }) as T
}
