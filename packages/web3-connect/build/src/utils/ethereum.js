/* eslint-disable @typescript-eslint/no-explicit-any */
import { isAnyEvmChain } from "@galacticcouncil/utils";
import { chainsMap } from "@galacticcouncil/xc-cfg";
import { isFunction } from "remeda";
export async function requestAccounts(provider) {
    if (!isEip1193Provider(provider))
        return;
    await provider.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
    });
}
export async function requestNetworkSwitch(provider, options = {}) {
    if (!isEip1193Provider(provider))
        return;
    const params = getAddEvmChainParams(options.chain ?? "hydration");
    try {
        await provider
            .request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: params.chainId }],
        })
            .then(options?.onSwitch);
    }
    catch (error) {
        const errorType = normalizeChainSwitchError(provider, error);
        if (errorType === "CHAIN_NOT_FOUND") {
            try {
                await Promise.race([
                    provider.request({
                        method: "wallet_addEthereumChain",
                        params: [params],
                    }),
                    new Promise((resolve) => {
                        const id = setInterval(async () => {
                            const chainId = await provider.request({ method: "eth_chainId" });
                            if (chainId === params.chainId) {
                                resolve(true);
                                clearInterval(id);
                            }
                            else {
                                await provider.request({
                                    method: "wallet_switchEthereumChain",
                                    params: [params],
                                });
                            }
                        }, 5000);
                    }),
                ]);
                options?.onSwitch?.();
            }
            catch {
                console.error("Failed to switch network");
            }
        }
        else {
            if (error instanceof Error)
                throw error;
        }
    }
}
const getAddEvmChainParams = (chainKey) => {
    const chain = chainsMap.get(chainKey);
    if (!chain || !isAnyEvmChain(chain)) {
        throw new Error("Chain is not an EVM chain");
    }
    const chainProps = chain.evmClient.chain;
    return {
        chainId: "0x" + Number(chainProps.id).toString(16),
        chainName: chainProps.name,
        rpcUrls: chainProps.rpcUrls.default.http,
        iconUrls: [],
        nativeCurrency: chainProps.nativeCurrency,
        blockExplorerUrls: chainProps.blockExplorers?.default
            ? [chainProps.blockExplorers.default.url]
            : [],
    };
};
function normalizeChainSwitchError(provider, error) {
    if (!provider)
        return;
    let message = {};
    if (typeof error === "string") {
        return "CHAIN_NOT_FOUND";
    }
    try {
        message =
            typeof error?.message === "string" ? JSON.parse(error.message) : {};
    }
    catch (err) {
        console.error("Failed to parse error message", err);
    }
    const errorCode = message?.data?.originalError?.code ||
        error.data?.originalError?.code ||
        error?.code;
    if (errorCode === 4902) {
        return "CHAIN_NOT_FOUND";
    }
}
export function isEip1193Provider(provider) {
    return isFunction(provider?.request);
}
