import { ReactNode } from "react";
import { ChainId } from "@/ui-config/networksConfig";
export type MarketDataType = {
    v3?: boolean;
    marketTitle: string;
    market: CustomMarket;
    chainId: ChainId;
    enabledFeatures?: {
        liquiditySwap?: boolean;
        staking?: boolean;
        governance?: boolean;
        faucet?: boolean;
        collateralRepay?: boolean;
        incentives?: boolean;
        permissions?: boolean;
        debtSwitch?: boolean;
        withdrawAndSwitch?: boolean;
        switch?: boolean;
    };
    isFork?: boolean;
    permissionComponent?: ReactNode;
    disableCharts?: boolean;
    subgraphUrl?: string;
    addresses: {
        LENDING_POOL_ADDRESS_PROVIDER: string;
        LENDING_POOL: string;
        WETH_GATEWAY?: string;
        SWAP_COLLATERAL_ADAPTER?: string;
        REPAY_WITH_COLLATERAL_ADAPTER?: string;
        DEBT_SWITCH_ADAPTER?: string;
        WITHDRAW_SWITCH_ADAPTER?: string;
        FAUCET?: string;
        PERMISSION_MANAGER?: string;
        WALLET_BALANCE_PROVIDER: string;
        L2_ENCODER?: string;
        UI_POOL_DATA_PROVIDER: string;
        UI_INCENTIVE_DATA_PROVIDER?: string;
        COLLECTOR?: string;
        V3_MIGRATOR?: string;
        GHO_TOKEN_ADDRESS?: string;
        GHO_UI_DATA_PROVIDER?: string;
    };
    /**
     * https://www.hal.xyz/ has integrated aave for healtfactor warning notification
     * the integration doesn't follow aave market naming & only supports a subset of markets.
     * When a halIntegration is specified a link to hal will be displayed on the ui.
     */
    halIntegration?: {
        URL: string;
        marketName: string;
    };
};
export declare enum CustomMarket {
    hydration_v3 = "hydration_v3",
    hydration_testnet_v3 = "hydration_testnet_v3"
}
export declare const marketsData: {
    [key in keyof typeof CustomMarket]: MarketDataType;
};
