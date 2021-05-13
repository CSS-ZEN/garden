
import {useMemo, useState, useRef, useEffect} from 'react'


export default function useDebounce<T extends Lambda> (f: T, time: number): [boolean, T] {
    const [debouncing, setDebouncing] = useState(false)
    const savedCallback = useRef(f)
    const tomb = useRef<ReturnType<typeof setTimeout> | null>(null)
    const [action, setAction] = useState<() => void>(() => {})

    const killDebounced = (release = false) => {
        if (!tomb.current) return
        clearTimeout(tomb.current)

        if (release) action()
        else {
            tomb.current = null
        }
    }

    useEffect(() => {
        killDebounced(true)
        savedCallback.current = f
    }, [f])

    const debouncedCallback = useMemo<T>(() => {
        return ((...args: ANY[]) => {
            setDebouncing(true)
            const fc = savedCallback.current
            killDebounced()
            setAction(() => {
                const nextAction = () => {
                    setDebouncing(false)
                    killDebounced()
                    fc(...args)
                }
                tomb.current = setTimeout(nextAction, time)
                return nextAction
            })
        }) as T
    }, [f])

    return [debouncing, debouncedCallback]
}
