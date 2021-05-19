
interface ISass {
    compile (source: string, callback?: Lambda1<ISassResult>): void
    options (options: Partial<ISassOptions> | 'defaults', callback?: Lambda1<void | Error>): void
    writeFile (files: Record<string, string>, callback?: Lambda1<boolean>): void
    writeFile (path: string, source: string, callback?: Lambda1<boolean>): void
    compileFile (path: string, callback?: Lambda1<ISassResult>): void
    compileFile (path: string, options: Partial<ISassOptions>, callback?: Lambda1<ISassResult>): void
}

type ISassResult = {
    status: 0
    files: []
    map: {
        version: number
        sourceRoot: string
        file: string
        sources: string[]
        sourcesContent: string[]
        mappings: string
        names: string[]
    }
    text: string
} | {
    status: 1
    file: string
    line: number
    column: number
    message: string
    formatted: string
}

enum ISassStyle {
    nested = 0,
    expanded = 1,
    compact = 2,
    compressed = 3,
}

interface ISassOptions {
    style: ISassStyle
    // Decimal point precision for outputting fractional numbers
    // (-1 will use the libsass default, which currently is 5)
    precision: number
    comments: boolean
    indent: string
    linefeed: string
    // Treat source_string as SASS (as opposed to SCSS) when false
    indentedSyntax: boolean

    // Path to source map file
    // Enables the source map generating
    // Used to create sourceMappingUrl
    sourceMapFile: string,
    // Pass-through as sourceRoot property
    sourceMapRoot: string,
    // The input path is used for source map generation.
    // It can be used to define something with string
    // compilation or to overload the input file path.
    // It is set to "stdin" for data contexts
    // and to the input file on file contexts.
    inputPath: string,
    // The output path is used for source map generation.
    // Libsass will not write to this file, it is just
    // used to create information in source-maps etc.
    outputPath: string,
    sourceMapContents: boolean,
    sourceMapEmbed: boolean,
    sourceMapOmitUrl: boolean,
}

export default async function compileSass (scss: string, options?: Partial<ISassOptions>) {
    const {Sass} = window as ANY
    if (!Sass) throw new Error('Sass library unavailable')

    const sass: ISass = new Sass()
    sass.options({
        style: ISassStyle.expanded,
        indent: '    ',
        linefeed: '\n',
    })
    if (options) sass.options(options)

    sass.writeFile('theme.scss', scss)

    return new Promise<ISassResult>(resolve => sass.compileFile('theme.scss', resolve))
}
