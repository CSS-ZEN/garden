
import {useCallback, useEffect, useRef} from 'react'


export default function useTimer (f: Lambda, ms: number) {
    const timer = useRef<ReturnType<typeof setTimeout>>()
    const cancel = useCallback(() => timer.current && clearTimeout(timer.current), [])

    useEffect(() => {
        timer.current = setTimeout(f, ms)
        return cancel
    }, [])

    return cancel
}
