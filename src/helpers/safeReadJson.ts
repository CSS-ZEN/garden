
export default function safeReadJson<T extends Record<string, ANY>> (str: string | undefined, fallback: T): T {
    if (!str) return fallback
    try {
        return JSON.parse(str)
    } catch (err) {
        return fallback
    }
}
