import { BaseProvider, StaticJsonRpcProvider, } from "@ethersproject/providers";
import { logger } from "ethers";
const DEFAULT_FALL_FORWARD_DELAY = 60000;
const MAX_RETRIES = 1;
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
/**
 * Returns the network as long as all agree. Throws an error if any two networks do not match
 * @param networks the list of networks to verify
 * @returns Network
 */
export function checkNetworks(networks) {
    if (networks.length === 0) {
        logger.throwArgumentError("no networks provided", "networks", networks);
    }
    let result;
    for (let i = 0; i < networks.length; i++) {
        const network = networks[i];
        if (!network) {
            logger.throwArgumentError("network not defined", "networks", networks);
        }
        if (!result) {
            result = network;
            continue;
        }
        // Make sure the network matches the previous networks
        if (!(result.name.toLowerCase() === network.name.toLowerCase() &&
            result.chainId === network.chainId &&
            (result.ensAddress?.toLowerCase() ===
                network.ensAddress?.toLowerCase() ||
                (result.ensAddress == null && network.ensAddress == null)))) {
            logger.throwArgumentError("provider mismatch", "networks", networks);
        }
    }
    if (!result) {
        logger.throwArgumentError("no networks defined", "networks", networks);
    }
    return result;
}
/**
 * The provider will rotate rpcs on error.
 * If provider rotates away from the first RPC, rotate back after a set interval to prioritize using most reliable RPC.
 * If provider rotates through all rpcs, delay to avoid spamming rpcs with requests.
 */
export class RotationProvider extends BaseProvider {
    providers;
    currentProviderIndex = 0;
    firstRotationTimestamp = 0;
    // number of full loops through provider array before throwing an error
    maxRetries = 0;
    retries = 0;
    // if we rotate away from first rpc, return back after this delay
    fallForwardDelay;
    lastError = "";
    constructor(urls, chainId, config) {
        super(chainId);
        this.providers = urls.map((url) => new StaticJsonRpcProvider(url, chainId));
        this.maxRetries = config?.maxRetries || MAX_RETRIES;
        this.fallForwardDelay =
            config?.fallFowardDelay || DEFAULT_FALL_FORWARD_DELAY;
    }
    /**
     * If we rotate away from the first RPC, rotate back after a set interval to prioritize using most reliable RPC
     */
    async fallForwardRotation() {
        const now = new Date().getTime();
        const diff = now - this.firstRotationTimestamp;
        if (diff < this.fallForwardDelay) {
            await sleep(this.fallForwardDelay - diff);
            this.currentProviderIndex = 0;
        }
    }
    /**
     * If rpc fails, rotate to next available and trigger rotation or fall forward delay where applicable
     * @param prevIndex last updated index, checked to avoid having multiple active rotations
     */
    async rotateUrl(prevIndex) {
        // don't rotate when another rotation was already triggered
        if (prevIndex !== this.currentProviderIndex)
            return;
        // if we rotate away from the first url, switch back after FALL_FORWARD_DELAY
        if (this.currentProviderIndex === 0) {
            this.currentProviderIndex += 1;
            this.firstRotationTimestamp = new Date().getTime();
            this.fallForwardRotation();
        }
        else if (this.currentProviderIndex === this.providers.length - 1) {
            this.retries += 1;
            if (this.retries > this.maxRetries) {
                this.retries = 0;
                throw new Error(`RotationProvider exceeded max number of retries. Last error: ${this.lastError}`);
            }
            this.currentProviderIndex = 0;
        }
        else {
            this.currentProviderIndex += 1;
        }
    }
    async detectNetwork() {
        const networks = await Promise.all(this.providers.map((c) => c.getNetwork()));
        return checkNetworks(networks);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async send(method, params) {
        const index = this.currentProviderIndex;
        try {
            return await this.providers[index].send(method, params);
        }
        catch (e) {
            if (e instanceof Error) {
                console.error(e.message);
                await this.rotateUrl(index);
                return this.send(method, params);
            }
        }
    }
    // eslint-disable-next-line
    async perform(method, params) {
        const index = this.currentProviderIndex;
        try {
            return await this.providers[index].perform(method, params);
        }
        catch (e) {
            if (e instanceof Error) {
                this.lastError = e.message;
                this.emit("debug", {
                    action: "perform",
                    provider: this.providers[index],
                });
                await this.rotateUrl(index);
                return await this.perform(method, params);
            }
        }
    }
}
