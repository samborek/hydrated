import { ChainEcosystem } from "@galacticcouncil/xc-core";
const BASE_URL = "https://raw.githubusercontent.com/galacticcouncil/intergalactic-asset-metadata/master";
export class AssetMetadataFactory {
    static _instance = new AssetMetadataFactory();
    assets = [];
    chains = [];
    constructor() {
        if (AssetMetadataFactory._instance) {
            throw new Error("Use AssetMetadataFactory.getInstance() instead of new.");
        }
        AssetMetadataFactory._instance = this;
    }
    static getInstance() {
        return AssetMetadataFactory._instance;
    }
    async fetchData(path) {
        const response = await fetch(BASE_URL + path);
        return response.json();
    }
    async fetchAssets() {
        if (!this.assets.length) {
            const data = await this.fetchData("/assets-v2.json");
            this.assets = data.items.map((item) => `${this.getBaseUrl(data)}/${item}`);
        }
        return this.assets;
    }
    async fetchChains() {
        if (!this.chains.length) {
            const data = await this.fetchData("/chains-v2.json");
            this.chains = data.items.map((item) => `${this.getBaseUrl(data)}/${item}`);
        }
        return this.chains;
    }
    getBaseUrl(data) {
        const { cdn, path, repository } = data;
        return [cdn["jsDelivr"], repository + "@latest", path].join("/");
    }
    getAssetLogoSrc(chainId, assetId, ecosystem = ChainEcosystem.Polkadot) {
        const key = [ecosystem.toLowerCase(), chainId, "assets", assetId].join("/");
        return this.assets.find((path) => path.includes(key + "/icon")) ?? "";
    }
    getChainLogoSrc(chainId, ecosystem = ChainEcosystem.Polkadot) {
        const key = [ecosystem.toLowerCase(), chainId].join("/");
        return this.chains.find((path) => path.includes(key + "/icon")) ?? "";
    }
}
