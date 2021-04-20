
type Lambda<T = any> = (...args: any[]) => T
type PromiseContent<P> = P extends Promise<infer PC> ? PC : any

/**
 * @deprecated avoid use it anyway
 * @description explicit type of any
 */
type ANY = any

declare module '*.md'
