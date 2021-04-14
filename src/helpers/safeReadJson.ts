
export default function safeReadJson<T extends Record<string, any>> (str: string): T | {} {
    try {
        return JSON.parse(str)
    } catch (err) {
        return {}
    }
}
