import { ChainId, InterestRate, Stake } from "@aave/contract-helpers";
import { TxErrorType } from "@/ui-config/errorMapping";
export declare enum EmodeModalType {
    ENABLE = "Enable",
    DISABLE = "Disable",
    SWITCH = "Manage"
}
export declare enum ModalType {
    Supply = 0,
    Withdraw = 1,
    Borrow = 2,
    Repay = 3,
    CollateralChange = 4,
    RateSwitch = 5,
    Stake = 6,
    Unstake = 7,
    StakeCooldown = 8,
    StakeRewardClaim = 9,
    ClaimRewards = 10,
    Emode = 11,
    Faucet = 12,
    Swap = 13,
    DebtSwitch = 14,
    GovDelegation = 15,
    GovVote = 16,
    V3Migration = 17,
    RevokeGovDelegation = 18,
    StakeRewardsClaimRestake = 19,
    Switch = 20,
    GovRepresentatives = 21
}
export interface ModalArgsType {
    underlyingAsset?: string;
    support?: boolean;
    power?: string;
    icon?: string;
    stakeAssetName?: Stake;
    currentRateMode?: InterestRate;
    emode?: EmodeModalType;
    isFrozen?: boolean;
    representatives?: Array<{
        chainId: ChainId;
        representative: string;
    }>;
}
export type TxStateType = {
    txHash?: string;
    loading?: boolean;
    success?: boolean;
};
export interface ModalContextType<T extends ModalArgsType> {
    openSupply: (underlyingAsset: string) => void;
    openWithdraw: (underlyingAsset: string) => void;
    openBorrow: (underlyingAsset: string) => void;
    openRepay: (underlyingAsset: string, currentRateMode: InterestRate, isFrozen: boolean) => void;
    openCollateralChange: (underlyingAsset: string) => void;
    openRateSwitch: (underlyingAsset: string, currentRateMode: InterestRate) => void;
    openClaimRewards: (underlyingAsset?: string) => void;
    openEmode: (mode: EmodeModalType) => void;
    close: () => void;
    type?: ModalType;
    args: T;
    mainTxState: TxStateType;
    approvalTxState: TxStateType;
    setApprovalTxState: (data: TxStateType) => void;
    setMainTxState: (data: TxStateType) => void;
    gasLimit: string;
    setGasLimit: (limit: string) => void;
    loadingTxns: boolean;
    setLoadingTxns: (loading: boolean) => void;
    txError: TxErrorType | undefined;
    setTxError: (error: TxErrorType | undefined) => void;
}
export declare const ModalContext: import("react").Context<ModalContextType<ModalArgsType>>;
export declare const ModalContextProvider: React.FC<{
    children?: React.ReactNode;
}>;
export declare const useModalContext: () => ModalContextType<ModalArgsType>;
