import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { createContext, useContext, useState } from "react";
export var EmodeModalType;
(function (EmodeModalType) {
    EmodeModalType["ENABLE"] = "Enable";
    EmodeModalType["DISABLE"] = "Disable";
    EmodeModalType["SWITCH"] = "Manage";
})(EmodeModalType || (EmodeModalType = {}));
export var ModalType;
(function (ModalType) {
    ModalType[ModalType["Supply"] = 0] = "Supply";
    ModalType[ModalType["Withdraw"] = 1] = "Withdraw";
    ModalType[ModalType["Borrow"] = 2] = "Borrow";
    ModalType[ModalType["Repay"] = 3] = "Repay";
    ModalType[ModalType["CollateralChange"] = 4] = "CollateralChange";
    ModalType[ModalType["RateSwitch"] = 5] = "RateSwitch";
    ModalType[ModalType["Stake"] = 6] = "Stake";
    ModalType[ModalType["Unstake"] = 7] = "Unstake";
    ModalType[ModalType["StakeCooldown"] = 8] = "StakeCooldown";
    ModalType[ModalType["StakeRewardClaim"] = 9] = "StakeRewardClaim";
    ModalType[ModalType["ClaimRewards"] = 10] = "ClaimRewards";
    ModalType[ModalType["Emode"] = 11] = "Emode";
    ModalType[ModalType["Faucet"] = 12] = "Faucet";
    ModalType[ModalType["Swap"] = 13] = "Swap";
    ModalType[ModalType["DebtSwitch"] = 14] = "DebtSwitch";
    ModalType[ModalType["GovDelegation"] = 15] = "GovDelegation";
    ModalType[ModalType["GovVote"] = 16] = "GovVote";
    ModalType[ModalType["V3Migration"] = 17] = "V3Migration";
    ModalType[ModalType["RevokeGovDelegation"] = 18] = "RevokeGovDelegation";
    ModalType[ModalType["StakeRewardsClaimRestake"] = 19] = "StakeRewardsClaimRestake";
    ModalType[ModalType["Switch"] = 20] = "Switch";
    ModalType[ModalType["GovRepresentatives"] = 21] = "GovRepresentatives";
})(ModalType || (ModalType = {}));
export const ModalContext = createContext({});
export const ModalContextProvider = ({ children, }) => {
    // contains the current modal open state if any
    const [type, setType] = useState();
    // contains arbitrary key-value pairs as a modal context
    const [args, setArgs] = useState({});
    const [approvalTxState, setApprovalTxState] = useState({});
    const [mainTxState, setMainTxState] = useState({});
    const [gasLimit, setGasLimit] = useState("");
    const [loadingTxns, setLoadingTxns] = useState(false);
    const [txError, setTxError] = useState();
    return (_jsx(ModalContext.Provider, { value: {
            openSupply: (underlyingAsset) => {
                setType(ModalType.Supply);
                setArgs({ underlyingAsset });
            },
            openWithdraw: (underlyingAsset) => {
                setType(ModalType.Withdraw);
                setArgs({ underlyingAsset });
            },
            openBorrow: (underlyingAsset) => {
                setType(ModalType.Borrow);
                setArgs({ underlyingAsset });
            },
            openRepay: (underlyingAsset, currentRateMode, isFrozen) => {
                setType(ModalType.Repay);
                setArgs({ underlyingAsset, currentRateMode, isFrozen });
            },
            openCollateralChange: (underlyingAsset) => {
                setType(ModalType.CollateralChange);
                setArgs({ underlyingAsset });
            },
            openRateSwitch: (underlyingAsset, currentRateMode) => {
                setType(ModalType.RateSwitch);
                setArgs({ underlyingAsset, currentRateMode });
            },
            openClaimRewards: (underlyingAsset) => {
                setType(ModalType.ClaimRewards);
                setArgs({ underlyingAsset });
            },
            openEmode: (mode) => {
                setType(ModalType.Emode);
                setArgs({ emode: mode });
            },
            close: () => {
                setType(undefined);
                setArgs({});
                setMainTxState({});
                setApprovalTxState({});
                setGasLimit("");
                setTxError(undefined);
            },
            type,
            args,
            approvalTxState,
            mainTxState,
            setApprovalTxState,
            setMainTxState,
            gasLimit,
            setGasLimit,
            loadingTxns,
            setLoadingTxns,
            txError,
            setTxError,
        }, children: children }));
};
export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error("useModalContext must be used within a ModalProvider");
    }
    return context;
};
