
type Lambda<T = any> = (...args: any[]) => T
type PromiseContent<P> = P extends Promise<infer PC> ? PC : any

declare module '*.md'
