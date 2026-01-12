import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { ProtocolAction } from "@aave/contract-helpers";
import { IAaveIncentivesControllerV2__factory } from "@aave/contract-helpers/src/incentive-controller-v2/typechain/IAaveIncentivesControllerV2__factory";
import { IPool__factory } from "@aave/contract-helpers/src/v3-pool-contract/typechain/IPool__factory";
import { safeConvertSS58toH160 } from "@galacticcouncil/utils";
import { useAccount } from "@galacticcouncil/web3-connect";
import { CallType } from "@galacticcouncil/xc-core";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { useBackgroundDataProvider } from "@/hooks/app-data-provider/BackgroundDataProvider";
import { Web3Context } from "@/libs/hooks/useWeb3Context";
import { useRootStore } from "@/store/root";
import { queryKeysFactory } from "@/ui-config/queries";
import { getFunctionDefsFromAbi } from "@/utils/utils";
const getAbiMethodByProtocolAction = (action) => {
    switch (action) {
        case ProtocolAction.switchBorrowRateMode:
            return "swapBorrowRateMode";
        case ProtocolAction.setUsageAsCollateral:
            return "setUserUseReserveAsCollateral";
        case ProtocolAction.setEModeUsage:
            return "setUserEMode";
        default:
            return action;
    }
};
const getTransactionAbi = (action) => {
    if (!action) {
        return "";
    }
    const factory = action === ProtocolAction.claimRewards
        ? IAaveIncentivesControllerV2__factory
        : IPool__factory;
    const abi = action
        ? getFunctionDefsFromAbi(factory.abi, getAbiMethodByProtocolAction(action))
        : undefined;
    return abi ?? "";
};
export const Web3ContextProvider = ({ onCreateTransaction, children }) => {
    const queryClient = useQueryClient();
    const { account } = useAccount();
    const { refetchPoolData, refetchIncentiveData, refetchGhoData } = useBackgroundDataProvider();
    const accountAddress = account?.address ?? "";
    const address = safeConvertSS58toH160(accountAddress);
    const [setAccount] = useRootStore((store) => [store.setAccount]);
    const sendTx = useCallback(async (tx, toasts, action) => {
        const abi = getTransactionAbi(action);
        const evmCall = {
            data: tx.data ?? "",
            from: tx.from ?? "",
            to: tx.to,
            type: CallType.Evm,
            abi,
            gasLimit: tx.gasLimit ? BigInt(tx.gasLimit.toString()) : 0n,
            maxFeePerGas: tx.maxFeePerGas ? BigInt(tx.maxFeePerGas.toString()) : 0n,
            maxPriorityFeePerGas: tx.maxPriorityFeePerGas
                ? BigInt(tx.maxPriorityFeePerGas.toString())
                : 0n,
            dryRun: (() => { }),
        };
        onCreateTransaction({
            tx: evmCall,
            toasts,
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: queryKeysFactory.pool });
                refetchPoolData?.();
                refetchIncentiveData?.();
                refetchGhoData?.();
            },
        });
    }, [
        onCreateTransaction,
        queryClient,
        refetchGhoData,
        refetchIncentiveData,
        refetchPoolData,
    ]);
    useEffect(() => {
        setAccount(address?.toLowerCase() || "");
    }, [address, setAccount]);
    return (_jsx(Web3Context.Provider, { value: {
            web3ProviderData: {
                sendTx,
                currentAccount: address?.toLowerCase() || "",
            },
        }, children: children }));
};
