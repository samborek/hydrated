import { InterestRate } from "@aave/contract-helpers";
import { SignatureLike } from "@ethersproject/bytes";
import { ComputedReserveData } from "@/hooks/commonTypes";
export type TxState = {
    txError?: string;
    success: boolean;
    gasEstimationError?: string;
};
export type Reward = {
    assets: string[];
    incentiveControllerAddress: string;
    symbol: string;
    balance: string;
    balanceUsd: string;
    rewardTokenAddress: string;
};
export type EmodeCategory = {
    id: number;
    ltv: number;
    liquidationThreshold: number;
    liquidationBonus: number;
    priceSource: string;
    label: string;
    assets: string[];
};
export declare enum CollateralType {
    ENABLED = 0,
    ISOLATED_ENABLED = 1,
    DISABLED = 2,
    ISOLATED_DISABLED = 3,
    UNAVAILABLE = 4,
    UNAVAILABLE_DUE_TO_ISOLATION = 5
}
type SwapRateParams = {
    inputAmount: string;
    outputAmount: string;
    inputAmountUSD: string;
    outputAmountUSD: string;
};
export type SwapTransactionParams = SwapRateParams & {
    swapCallData: string;
    augustus: string;
};
interface DebtSwitchBaseProps {
    amountToSwap: string;
    amountToReceive: string;
    poolReserve: ComputedReserveData;
    targetReserve: ComputedReserveData;
    customGasPrice?: string;
    symbol?: string;
    blocked?: boolean;
    isMaxSelected: boolean;
    loading?: boolean;
    currentRateMode: number;
}
export interface DebtSwitchActionProps extends DebtSwitchBaseProps {
    augustus: string;
    txCalldata: string;
}
interface CollateralRepayBaseProps {
    rateMode: InterestRate;
    repayAmount: string;
    repayWithAmount: string;
    fromAssetData: ComputedReserveData;
    poolReserve: ComputedReserveData;
    customGasPrice?: string;
    symbol: string;
    repayAllDebt: boolean;
    useFlashLoan: boolean;
    blocked: boolean;
    loading?: boolean;
    signature?: SignatureLike;
    signedAmount?: string;
    deadline?: string;
}
export interface CollateralRepayActionProps extends CollateralRepayBaseProps {
    augustus: string;
    swapCallData: string;
}
interface SwapBaseProps {
    amountToSwap: string;
    amountToReceive: string;
    poolReserve: ComputedReserveData;
    targetReserve: ComputedReserveData;
    customGasPrice?: string;
    symbol: string;
    blocked: boolean;
    isMaxSelected: boolean;
    useFlashLoan: boolean;
    loading?: boolean;
    signature?: SignatureLike;
    deadline?: string;
    signedAmount?: string;
}
export interface SwapActionProps extends SwapBaseProps {
    swapCallData: string;
    augustus: string;
}
interface WithdrawAndSwitchProps {
    amountToSwap: string;
    amountToReceive: string;
    poolReserve: ComputedReserveData;
    targetReserve: ComputedReserveData;
    blocked: boolean;
    isMaxSelected: boolean;
    loading?: boolean;
    buildTxFn: () => Promise<SwapTransactionParams>;
}
export interface WithdrawAndSwitchActionProps extends Pick<WithdrawAndSwitchProps, "amountToSwap" | "amountToReceive" | "poolReserve" | "targetReserve" | "isMaxSelected"> {
    augustus: string;
    txCalldata: string;
}
export {};
