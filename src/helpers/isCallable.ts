
export default function isFunction<T extends (...args: ANY[]) => ANY> (fn: ANY): fn is T {
    const toString = (a: ANY): string => Reflect.apply(Object.prototype.toString, a, [])
    return !!fn && toString(fn) === '[object Function]'
}
