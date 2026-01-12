/**
 * This function returns a useEffect hook which will call `implementation` based on the supplied `interval`.
 * The useEffect uses global state to ensure only a single interval is running at any given time.
 * @param implementation the implementation to execute
 * @param interval the interval for in which the implementation should be executed
 * @returns react hook
 */
export declare function createSingletonSubscriber<T extends () => Promise<void>>(implementation: T, interval: number): () => T;
