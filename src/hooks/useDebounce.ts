
import {useMemo, useState, useRef, useEffect} from 'react'


export default function useDebounce<T extends Lambda> (f: T, time: number): [boolean, T] {
    const [debouncing, setDebouncing] = useState(false)
    const savedCallback = useRef(f)

    useEffect(() => {
        savedCallback.current = f
    }, [f])

    const debouncedCallback = useMemo<T>(() => {
        let debounced: null | ReturnType<typeof setTimeout> = null
        return ((...args: ANY[]) => {
            setDebouncing(true)
            const fc = savedCallback.current
            if (debounced) clearTimeout(debounced)
            debounced = setTimeout(() => {
                setDebouncing(false)
                if (fc) fc(...args)
            }, time)
        }) as T
    }, [f])

    return [debouncing, debouncedCallback]
}
