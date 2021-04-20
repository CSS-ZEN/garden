
import {useEffect} from 'react'

export default function useTimer (timerFactory: Lambda, timeout: number) {
    useEffect(() => (timer => () => clearTimeout(timer))(setTimeout(timerFactory, timeout)), [])
}
