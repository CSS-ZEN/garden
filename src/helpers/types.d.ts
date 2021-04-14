type F<R = any> = (...args: any[]) => R
type R<T> = T extends F<infer RR> ? RR : never
