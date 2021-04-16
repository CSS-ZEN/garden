
import {useState} from 'react'

import {LANDING_THRESHOLD} from 'src/config'
import {useTimer} from 'src/hooks'

import Fabric from './fabric'
import Quote from './quote'


export default function Landing () {
    const [loadingTooSlow, setter] = useState(false)
    useTimer(() => setter(true), LANDING_THRESHOLD)

    const quote = loadingTooSlow
        ? <Quote inline quote="This is not the end. It is not even the beginning of the end. But it is, perhaps, the end of the beginning." author="Churchill" />
        : <Quote inline quote="Everything will be okay in the end. If it's not okay, it's not the end." author="John Lennon" />

    return (
        <Fabric className={'domino-container'} full>
            <p className="domino-description domino-description--scrawcrow">{quote}</p>
            <ul className="dominos" aria-busy="true" aria-label="Loading">
                <li className="domino" />
                <li className="domino" />
                <li className="domino" />
                <li className="domino" />
                <li className="domino" />
                <li className="domino" />
                <li className="domino" />
            </ul>
            <p className="domino-description">{quote}</p>
        </Fabric>
    )
}
