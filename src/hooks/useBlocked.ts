
import {useState, useCallback, DependencyList} from 'react'


export default function useBlocked<T extends Lambda<ANY>> (action: T, deps: DependencyList = []): [boolean, T] {
    const [blocked, setBlocked] = useState(false)
    const fa = useCallback((async (...args) => {
        if (blocked) return
        setBlocked(true)
        try {
            await action(...args)
        } catch (err) {
            console.error(err)
        } finally {
            setBlocked(false)
        }
    }) as T, deps.concat([blocked]))

    return [blocked, fa]
}
