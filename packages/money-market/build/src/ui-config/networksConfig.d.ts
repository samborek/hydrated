export declare enum ChainId {
    hydration = 222222,
    hydration_testnet = 333333
}
export type ExplorerLinkBuilderProps = {
    tx?: string;
    address?: string;
};
export type ExplorerLinkBuilderConfig = {
    baseUrl: string;
    addressPrefix?: string;
    txPrefix?: string;
};
export type NetworkConfig = {
    name: string;
    displayName?: string;
    baseAssetSymbol: string;
    baseAssetDecimals: number;
    explorerLink: string;
    explorerLinkBuilder: (props: ExplorerLinkBuilderProps) => string;
    isTestnet?: boolean;
    networkLogoPath: string;
    underlyingChainId?: number;
    bridge?: {
        icon: string;
        name: string;
        url: string;
    };
};
export type BaseNetworkConfig = Omit<NetworkConfig, "explorerLinkBuilder">;
export declare const networkConfigs: Record<string, BaseNetworkConfig>;
