import { ChainEcosystem } from "@galacticcouncil/xc-core";
export type TAssetResouce = {
    baseUrl: string;
    branch: string;
    cdn: {
        [key: string]: string;
    };
    path: string;
    repository: string;
    items: string[];
};
export declare class AssetMetadataFactory {
    private static _instance;
    private assets;
    private chains;
    private constructor();
    static getInstance(): AssetMetadataFactory;
    private fetchData;
    fetchAssets(): Promise<string[]>;
    fetchChains(): Promise<string[]>;
    getBaseUrl(data: TAssetResouce): string;
    getAssetLogoSrc(chainId: string | number, assetId: string | number, ecosystem?: ChainEcosystem): string;
    getChainLogoSrc(chainId: string | number, ecosystem?: ChainEcosystem): string;
}
