
import {useBroadcastChannel} from 'src/hooks'
import {defaultTheme, defaultThemes} from 'src/helpers/values'
import {SUBMIT_CHANNEL} from 'src/config'
import Garden from 'src/garden'


export default function Preview () {
    const [state] = useBroadcastChannel(SUBMIT_CHANNEL, defaultTheme)

    return <Garden theme={state} themeChoices={defaultThemes} />
}
