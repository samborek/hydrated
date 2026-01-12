export type PingResponse = {
    url: string;
    timestamp: number;
    ping: number | null;
    blockNumber: number | null;
};
/**
 * Sends a ping request to the specified URL and measures the round-trip time.
 * @param url The URL to ping.
 * @param timeoutMs The maximum time to wait for a response, in milliseconds.
 * @param signal `AbortSignal` to cancel the request.
 * @returns The status with blockNumber, timestamp and ping in milliseconds, or `Infinity` if the request timed out or failed.
 */
export declare function pingRpc(url: string, timeoutMs?: number, signal?: AbortSignal): Promise<PingResponse>;
export declare function getBestRpcs(urls: string[]): Promise<PingResponse[]>;
