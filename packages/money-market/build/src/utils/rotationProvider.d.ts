import { BaseProvider, Network, StaticJsonRpcProvider } from "@ethersproject/providers";
interface RotationProviderConfig {
    maxRetries?: number;
    fallFowardDelay?: number;
}
/**
 * Returns the network as long as all agree. Throws an error if any two networks do not match
 * @param networks the list of networks to verify
 * @returns Network
 */
export declare function checkNetworks(networks: Network[]): Network;
/**
 * The provider will rotate rpcs on error.
 * If provider rotates away from the first RPC, rotate back after a set interval to prioritize using most reliable RPC.
 * If provider rotates through all rpcs, delay to avoid spamming rpcs with requests.
 */
export declare class RotationProvider extends BaseProvider {
    readonly providers: StaticJsonRpcProvider[];
    private currentProviderIndex;
    private firstRotationTimestamp;
    private maxRetries;
    private retries;
    private fallForwardDelay;
    private lastError;
    constructor(urls: string[], chainId: number, config?: RotationProviderConfig);
    /**
     * If we rotate away from the first RPC, rotate back after a set interval to prioritize using most reliable RPC
     */
    fallForwardRotation(): Promise<void>;
    /**
     * If rpc fails, rotate to next available and trigger rotation or fall forward delay where applicable
     * @param prevIndex last updated index, checked to avoid having multiple active rotations
     */
    private rotateUrl;
    detectNetwork(): Promise<Network>;
    send(method: string, params: Array<any>): Promise<any>;
    perform(method: string, params: any): Promise<any>;
}
export {};
