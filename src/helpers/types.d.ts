
type Lambda<T = any> = (...args: any[]) => T
type Lambda1<T = any, R = void> = (arg: T) => R
type Arg1<L> = L extends Lambda1<infer T> ? T : any
type PromiseContent<P> = P extends Promise<infer PC> ? PC : any

/**
 * @description explicit type of any
 * @deprecated avoid using it anyway
 */
type ANY = any

declare module '*.md'
