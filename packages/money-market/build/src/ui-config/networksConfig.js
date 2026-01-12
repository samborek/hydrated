import { chainsMap } from "@galacticcouncil/xc-cfg";
export var ChainId;
(function (ChainId) {
    ChainId[ChainId["hydration"] = 222222] = "hydration";
    // Mock Hydration testnet chain ID so we can differentiate between mainnet and testnet
    ChainId[ChainId["hydration_testnet"] = 333333] = "hydration_testnet";
})(ChainId || (ChainId = {}));
const hydration = chainsMap.get("hydration").evmClient.chain;
export const networkConfigs = {
    [ChainId.hydration]: {
        name: "Hydration",
        baseAssetSymbol: "",
        baseAssetDecimals: 18,
        explorerLink: hydration.blockExplorers?.default?.url ?? "",
        isTestnet: false,
        networkLogoPath: "https://app.hydration.net/favicon/apple-touch-icon.png",
    },
    [ChainId.hydration_testnet]: {
        name: "Hydration Testnet",
        baseAssetSymbol: "",
        baseAssetDecimals: 18,
        explorerLink: "https://explorer.nice.hydration.cloud",
        isTestnet: true,
        networkLogoPath: "https://app.hydration.net/favicon/apple-touch-icon.png",
    },
};
