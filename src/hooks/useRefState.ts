
import {useRef, Dispatch, SetStateAction, MutableRefObject} from 'react'
import isCallable from 'src/helpers/isCallable'

export default function useRefState<S> (state: S, setState: Dispatch<SetStateAction<S>>): [S, MutableRefObject<S>, Dispatch<SetStateAction<S>>] {
    const ref = useRef(state)
    const updateState: typeof setState = s => setState(prev => {
        const next = isCallable(s) ? s(prev) : s
        ref.current = next
        return next
    })
    return [state, ref, updateState]
}
