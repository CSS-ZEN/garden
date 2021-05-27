
import {useState} from 'react'

import {LANDING_THRESHOLD} from 'src/config'
import {useTimer} from 'src/hooks'

import Quote from './quote'
import Domino from './domino'


export default function Landing () {
    const [loadingTooSlow, setter] = useState(false)
    useTimer(() => setter(true), LANDING_THRESHOLD)

    return (
        <Domino className="domino-container-landing">
            {loadingTooSlow
                ? <Quote inline quote="This is not the end. It is not even the beginning of the end. But it is, perhaps, the end of the beginning." author="Churchill" />
                : <Quote inline quote="Everything will be okay in the end. If it's not okay, it's not the end." author="John Lennon" />
            }
        </Domino>
    )
}
