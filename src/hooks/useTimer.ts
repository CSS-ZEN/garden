
import {useEffect} from 'react'
import {nullary} from 'src/helpers/arity'


export default function useTimer (timerFactory: Lambda, timeout: number) {
    useEffect(() => nullary(clearTimeout)(setTimeout(timerFactory, timeout)), [])
}
