
/**
 * @description avoid promise from raising errors, note that in some
 *     circumstances, a promise are supposed to raise error and end
 *     the process
 */
export default async function safeWaitPromise<T extends Promise<any>> (promise: T, fallback?: PromiseContent<T>): Promise<PromiseContent<T>> {
    try {
        return await promise
    } catch (err) {
        return fallback
    }
}
