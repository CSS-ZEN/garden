
import { useEffect } from 'react'

/**
 * @description it removes the second style sheet in '_app.js'
 */
export default function noTheme () {
    useEffect(() => {
        const $styles = document.head.querySelectorAll('style')
        const $themeStyle = $styles[1]
        if ($themeStyle) document.head.removeChild($themeStyle)
        return () => {
            if ($themeStyle) {
                const $styles = document.head.querySelectorAll('style')
                if ($styles[1]) document.head.insertBefore($themeStyle, $styles[1])
                else if ($styles[0] && $styles[0].nextSibling) document.head.insertBefore($themeStyle, $styles[0].nextSibling)
                else document.head.appendChild($themeStyle)
            }
        }
    }, [])
}
