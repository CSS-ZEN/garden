
import type {Options} from 'sass'
import type {IBasicFile} from 'src/helpers/values'


export default async function compileSass (content: string, options: Partial<Options<'async'>> = {}) {
    if (!content.trim()) return ''

    const sass = await import('sass')

    const defaultOptions: Partial<Options<'async'>> = {
        style: 'expanded',
    }
    const result = await sass.compileStringAsync(content, Object.assign({}, defaultOptions, options))

    return result.css
}
