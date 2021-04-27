
import {useEffect, useRef, useState, Dispatch, SetStateAction} from 'react'
import isCallable from './isCallable'


interface IBroadcastChannelEvent<T> {
    type: 'birth' | 'heartbeat' | 'setState'
    payload: T
}

/**
 * @description sync state between broadcast channels
 *
 * New comsumers get the latest state by firing a 'birth' event.
 */
export default function useBroadcastChannel<T> (name: string, data: T): [T, Dispatch<SetStateAction<T>>] {
    const [state, setState] = useState<T>(data)
    if (!process.browser || !window.BroadcastChannel) return [state, setState]

    const bc = useRef<BroadcastChannel>(new BroadcastChannel(name))

    useEffect(() => {
        let tomb: null | ReturnType<typeof setTimeout> = null
        const heartbeat = () => {
            try {
                bc.current.postMessage({type: 'heartbeat'})
                tomb = setTimeout(heartbeat, 1000)
            } catch (error) {
                if (window.confirm('Page looks like dead, do you want to reload?')) location.reload()
            }
        }
        heartbeat()

        const syncState = ({data: event}: MessageEvent<IBroadcastChannelEvent<T>>) => {
            if (event.type !== 'heartbeat') console.count(event.type)
            if (event.type === 'setState') {
                setState(event.payload)
            } else if (event.type === 'birth') {
                setState(s => {
                    bc.current.postMessage({
                        type: 'setState',
                        payload: s,
                    })
                    return s
                })
            }
        }

        bc.current.postMessage({
            type: 'birth',
        })

        bc.current.addEventListener('message', syncState)

        return () => {
            if (tomb) clearTimeout(tomb)
            bc.current.removeEventListener('message', syncState)
            bc.current.close()
        }
    }, [])

    const emitState: typeof setState = s => {
        setState(s)
        bc.current.postMessage({
            type: 'setState',
            payload: isCallable(s) ? s(state) : s,
        })
    }

    return [state, emitState]
}
