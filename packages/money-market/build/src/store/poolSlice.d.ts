import { ApproveDelegationType, EthereumTransactionTypeExtended, FaucetParamsType, InterestRate, LendingPoolBundleInterface, PoolBaseCurrencyHumanized, PoolBundleInterface, ProtocolAction, ReserveDataHumanized, ReservesIncentiveDataHumanized, UserReserveDataHumanized } from "@aave/contract-helpers";
import { LPBorrowParamsType, LPSetUsageAsCollateral, LPSwapBorrowRateMode, LPWithdrawParamsType } from "@aave/contract-helpers/dist/esm/lendingPool-contract/lendingPoolTypes";
import { LPRepayWithPermitParamsType, LPSignERC20ApprovalType, LPSupplyParamsType, LPSupplyWithPermitType } from "@aave/contract-helpers/dist/esm/v3-pool-contract/lendingPoolTypes";
import { PopulatedTransaction } from "ethers";
import { StateCreator } from "zustand";
import { CollateralRepayActionProps, DebtSwitchActionProps, Reward, SwapActionProps, WithdrawAndSwitchActionProps } from "@/helpers/types";
import { Approval } from "@/helpers/useTransactionHandler";
import { MarketDataType } from "@/ui-config/marketsConfig";
import { RootStore } from "./root";
export type PoolReserve = {
    reserves?: ReserveDataHumanized[];
    reserveIncentives?: ReservesIncentiveDataHumanized[];
    baseCurrencyData?: PoolBaseCurrencyHumanized;
    userEmodeCategoryId?: number;
    userReserves?: UserReserveDataHumanized[];
};
type RepayArgs = {
    amountToRepay: string;
    poolAddress: string;
    debtType: InterestRate;
    repayWithATokens: boolean;
    encodedTxData?: string;
};
type ClaimRewardsActionsProps = {
    blocked: boolean;
    selectedReward: Reward;
};
export interface PoolSlice {
    vDotApy: string;
    data: Map<number, Map<string, PoolReserve>>;
    refreshPoolData: (marketData?: MarketDataType) => Promise<void>;
    refreshPoolV3Data: () => Promise<void>;
    useOptimizedPath: () => boolean | undefined;
    mint: (args: Omit<FaucetParamsType, "userAddress">) => Promise<EthereumTransactionTypeExtended[]>;
    withdraw: (args: Omit<LPWithdrawParamsType, "user">) => Promise<EthereumTransactionTypeExtended[]>;
    setUsageAsCollateral: (args: Omit<LPSetUsageAsCollateral, "user">) => Promise<EthereumTransactionTypeExtended[]>;
    swapBorrowRateMode: (args: Omit<LPSwapBorrowRateMode, "user">) => Promise<EthereumTransactionTypeExtended[]>;
    paraswapRepayWithCollateral: (args: CollateralRepayActionProps) => Promise<EthereumTransactionTypeExtended[]>;
    debtSwitch: (args: DebtSwitchActionProps) => PopulatedTransaction;
    setUserEMode: (categoryId: number) => Promise<EthereumTransactionTypeExtended[]>;
    signERC20Approval: (args: Omit<LPSignERC20ApprovalType, "user">) => Promise<string>;
    claimRewards: (args: ClaimRewardsActionsProps) => Promise<EthereumTransactionTypeExtended[]>;
    swapCollateral: (args: SwapActionProps) => Promise<EthereumTransactionTypeExtended[]>;
    withdrawAndSwitch: (args: WithdrawAndSwitchActionProps) => PopulatedTransaction;
    repay: (args: RepayArgs) => PopulatedTransaction;
    encodeRepayParams: (args: RepayArgs) => Promise<string>;
    repayWithPermit: (args: Omit<LPRepayWithPermitParamsType, "user">) => PopulatedTransaction;
    encodeRepayWithPermitParams: (args: Omit<LPRepayWithPermitParamsType, "user">) => Promise<[string, string, string]>;
    poolComputed: {
        minRemainingBaseTokenBalance: string;
    };
    supply: (args: Omit<LPSupplyParamsType, "user">) => PopulatedTransaction;
    supplyWithPermit: (args: Omit<LPSupplyWithPermitType, "user">) => PopulatedTransaction;
    borrow: (args: Omit<LPBorrowParamsType, "user">) => PopulatedTransaction;
    getCreditDelegationApprovedAmount: (args: Omit<ApproveDelegationType, "user" | "amount">) => Promise<ApproveDelegationType>;
    generateCreditDelegationSignatureRequest: (approval: Approval & {
        deadline: string;
        spender: string;
    }) => Promise<string>;
    generateApproveDelegation: (args: Omit<ApproveDelegationType, "user">) => PopulatedTransaction;
    getCorrectPoolBundle: () => PoolBundleInterface | LendingPoolBundleInterface;
    estimateGasLimit: (tx: PopulatedTransaction, action?: ProtocolAction) => Promise<PopulatedTransaction>;
}
export declare const createPoolSlice: StateCreator<RootStore, [
    ["zustand/subscribeWithSelector", never],
    ["zustand/devtools", never]
], [
], PoolSlice>;
export {};
