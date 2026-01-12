import { AaveV3HydrationMainnet, AaveV3HydrationTestnet, } from "@/ui-config/addresses";
import { ChainId } from "@/ui-config/networksConfig";
export var CustomMarket;
(function (CustomMarket) {
    CustomMarket["hydration_v3"] = "hydration_v3";
    CustomMarket["hydration_testnet_v3"] = "hydration_testnet_v3";
})(CustomMarket || (CustomMarket = {}));
export const marketsData = {
    [CustomMarket.hydration_v3]: {
        marketTitle: "Hydration",
        market: CustomMarket.hydration_v3,
        v3: true,
        chainId: ChainId.hydration,
        addresses: {
            LENDING_POOL_ADDRESS_PROVIDER: AaveV3HydrationMainnet.POOL_ADDRESSES_PROVIDER,
            LENDING_POOL: AaveV3HydrationMainnet.POOL,
            WETH_GATEWAY: AaveV3HydrationMainnet.WETH_GATEWAY,
            FAUCET: AaveV3HydrationMainnet.FAUCET,
            WALLET_BALANCE_PROVIDER: AaveV3HydrationMainnet.WALLET_BALANCE_PROVIDER,
            UI_POOL_DATA_PROVIDER: AaveV3HydrationMainnet.UI_POOL_DATA_PROVIDER,
            UI_INCENTIVE_DATA_PROVIDER: AaveV3HydrationMainnet.UI_INCENTIVE_DATA_PROVIDER,
            GHO_TOKEN_ADDRESS: AaveV3HydrationMainnet.GHO_TOKEN_ADDRESS,
            GHO_UI_DATA_PROVIDER: AaveV3HydrationMainnet.GHO_UI_DATA_PROVIDER,
            COLLECTOR: AaveV3HydrationMainnet.COLLECTOR,
        },
    },
    [CustomMarket.hydration_testnet_v3]: {
        marketTitle: "Hydration Testnet",
        market: CustomMarket.hydration_testnet_v3,
        v3: true,
        chainId: ChainId.hydration_testnet,
        addresses: {
            LENDING_POOL_ADDRESS_PROVIDER: AaveV3HydrationTestnet.POOL_ADDRESSES_PROVIDER,
            LENDING_POOL: AaveV3HydrationTestnet.POOL,
            WETH_GATEWAY: AaveV3HydrationTestnet.WETH_GATEWAY,
            FAUCET: AaveV3HydrationTestnet.FAUCET,
            WALLET_BALANCE_PROVIDER: AaveV3HydrationTestnet.WALLET_BALANCE_PROVIDER,
            UI_POOL_DATA_PROVIDER: AaveV3HydrationTestnet.UI_POOL_DATA_PROVIDER,
            UI_INCENTIVE_DATA_PROVIDER: AaveV3HydrationTestnet.UI_INCENTIVE_DATA_PROVIDER,
            GHO_TOKEN_ADDRESS: AaveV3HydrationTestnet.GHO_TOKEN_ADDRESS,
            GHO_UI_DATA_PROVIDER: AaveV3HydrationTestnet.GHO_UI_DATA_PROVIDER,
            COLLECTOR: AaveV3HydrationMainnet.COLLECTOR,
        },
    },
};
