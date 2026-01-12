import { Fragment as _Fragment, jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { PERMISSION } from "@aave/contract-helpers";
import { getAssetIdFromAddress, MONEY_MARKET_STRATEGY_ASSETS, } from "@galacticcouncil/utils";
import { BasicModal } from "@/components/primitives/BasicModal";
import { TxModalWrapper } from "@/components/transactions/TxModalWrapper";
import { ModalType, useModalContext } from "@/hooks/useModal";
import { SupplyModalContent } from "./SupplyModalContent";
export const SupplyModal = () => {
    const { type, close, args } = useModalContext();
    const isStrategyAsset = MONEY_MARKET_STRATEGY_ASSETS.includes(getAssetIdFromAddress(args.underlyingAsset));
    return (_jsx(BasicModal, { open: type === ModalType.Supply, setOpen: close, title: "Supply", children: _jsx(TxModalWrapper, { action: "supply", underlyingAsset: args.underlyingAsset, requiredPermission: PERMISSION.DEPOSITOR, children: (params) => isStrategyAsset ? (_jsx(_Fragment, { children: "TODO STRATEGY SUPPLY" })) : (_jsx(SupplyModalContent, { ...params })) }) }));
};
