
import {useMemo, useState, DependencyList} from 'react'


export default function useDebounce<T extends Lambda> (f: T, time: number, deps?: DependencyList): [boolean, T] {
    const [debouncing, setDebouncing] = useState(false)
    const debouncedCallback = useMemo<T>(() => {
        let debounced: null | ReturnType<typeof setTimeout> = null
        return ((...args: ANY[]) => {
            setDebouncing(true)
            if (debounced) clearTimeout(debounced)
            debounced = setTimeout(() => {
                setDebouncing(false)
                f.apply(null, args)
            }, time)
        }) as T
    }, deps)

    return [debouncing, debouncedCallback]
}
