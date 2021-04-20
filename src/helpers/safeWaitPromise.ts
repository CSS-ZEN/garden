
/**
 * @description avoid promise from raising errors, note that in some
 *     circumstances, a promise are supposed to raise error and end
 *     the process
 */
export default async function safeWaitPromise<T extends Promise<any>, T2 extends PromiseContent<T>> (promise: T, fallback: T2): Promise<T2> {
    try {
        return await promise
    } catch (err) {
        return fallback
    }
}
