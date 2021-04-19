
type PromiseContent<P> = P extends Promise<infer PC> ? PC : any

declare module '*.md'
