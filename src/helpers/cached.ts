
import cache from 'memory-cache'


export default async function cached<T> (key: string, factory: () => Promise<T>, time: number): Promise<T> {
    const cachedValue = cache.get(key)
    if (cachedValue) return cachedValue

    const value = await factory()

    return cache.put(key, value, time * 1000)
}
