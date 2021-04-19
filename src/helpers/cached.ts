
import cache from 'memory-cache'


export default async function cached<T extends {ok: boolean}> (key: string, factory: () => Promise<T>, time: number): Promise<T> {
    const cachedValue = cache.get(key)
    if (cachedValue) return cachedValue

    const value = await factory()
    if (value.ok) cache.put(key, value, time * 1000)

    return value
}
