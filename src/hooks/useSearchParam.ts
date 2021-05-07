
import {useEffect} from 'react'


export default function useSearchParam (keys: string[], f: (...key: Array<string | null>) => void) {
    useEffect(() => {
        if (!process.browser) return
        return f(...keys.map(key => new URLSearchParams(location.search).get(key)))
    }, [])
}
