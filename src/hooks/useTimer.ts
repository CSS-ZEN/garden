
import { useEffect } from 'react'

export default function useTimer (timerFactory, timeout) {
    useEffect(() => (timer => () => clearTimeout(timer))(setTimeout(timerFactory, timeout)), [])
}
