import { ChainIdToNetwork } from "@aave/contract-helpers";
import { CustomMarket, marketsData as _marketsData, } from "@/ui-config/marketsConfig";
import { networkConfigs as _networkConfigs, } from "@/ui-config/networksConfig";
export const networkConfigs = Object.keys(_networkConfigs).reduce((acc, value) => {
    acc[value] = _networkConfigs[value];
    return acc;
}, {});
export const marketsData = Object.keys(_marketsData).reduce((acc, value) => {
    acc[value] = _marketsData[value];
    return acc;
}, {});
export function getDefaultChainId() {
    return marketsData[availableMarkets[0]].chainId;
}
export function getSupportedChainIds() {
    return Array.from(Object.keys(marketsData).reduce((acc, value) => acc.add(marketsData[value].chainId), new Set()));
}
export const availableMarkets = Object.keys(marketsData).filter((key) => getSupportedChainIds().includes(marketsData[key].chainId));
const linkBuilder = ({ baseUrl, addressPrefix = "address", txPrefix = "tx", }) => ({ tx, address }) => {
    if (tx) {
        return `${baseUrl}/${txPrefix}/${tx}`;
    }
    if (address) {
        return `${baseUrl}/${addressPrefix}/${address}`;
    }
    return baseUrl;
};
export function getNetworkConfig(chainId) {
    const config = networkConfigs[chainId];
    if (!config) {
        // this case can only ever occure when a wallet is connected with a unknown chainId which will not allow interaction
        const name = ChainIdToNetwork[chainId];
        return {
            name: name || `unknown chainId: ${chainId}`,
        };
    }
    return {
        ...config,
        explorerLinkBuilder: linkBuilder({ baseUrl: config.explorerLink }),
    };
}
export const isFeatureEnabled = {
    faucet: (data) => data.enabledFeatures?.faucet,
    liquiditySwap: (data) => data.enabledFeatures?.liquiditySwap,
    collateralRepay: (data) => data.enabledFeatures?.collateralRepay,
    permissions: (data) => data.enabledFeatures?.permissions,
    debtSwitch: (data) => data.enabledFeatures?.debtSwitch,
    withdrawAndSwitch: (data) => data.enabledFeatures?.withdrawAndSwitch,
    switch: (data) => data.enabledFeatures?.switch,
};
export { CustomMarket };
