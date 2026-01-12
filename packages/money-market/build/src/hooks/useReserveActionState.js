import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Alert } from "@galacticcouncil/ui/components";
import { getEmodeMessage } from "@/components/transactions/emode/emode.utils";
import { useAppDataContext } from "@/hooks/app-data-provider/useAppDataProvider";
import { useAssetCaps } from "@/hooks/useAssetCaps";
import { useRootStore } from "@/store/root";
import { assetCanBeBorrowedByUser } from "@/utils/getMaxAmountAvailableToBorrow";
export const useReserveActionState = ({ balance, maxAmountToSupply, maxAmountToBorrow, reserve, }) => {
    const { user, eModes } = useAppDataContext();
    const { supplyCap, borrowCap, debtCeiling } = useAssetCaps();
    const [currentMarket, displayGho] = useRootStore((store) => [
        store.currentMarket,
        store.displayGho,
    ]);
    const assetCanBeBorrowedFromPool = assetCanBeBorrowedByUser(reserve, user);
    const userHasNoCollateralSupplied = user?.totalCollateralMarketReferenceCurrency === "0";
    const isolationModeBorrowDisabled = user?.isInIsolationMode && !reserve.borrowableInIsolation;
    const eModeBorrowDisabled = user?.isInEmode && reserve.eModeCategoryId !== user.userEmodeCategoryId;
    const isGho = displayGho({ symbol: reserve.symbol, currentMarket });
    return {
        disableSupplyButton: balance === "0" || maxAmountToSupply === "0" || isGho,
        disableBorrowButton: !assetCanBeBorrowedFromPool ||
            userHasNoCollateralSupplied ||
            isolationModeBorrowDisabled ||
            eModeBorrowDisabled ||
            maxAmountToBorrow === "0",
        alerts: [
            balance === "0" && !isGho && (_jsx(Alert, { variant: "info", description: "Your wallet is empty. Purchase or transfer assets." }, "empty-wallet")),
            (balance !== "0" || isGho) &&
                user?.totalCollateralMarketReferenceCurrency === "0" && (_jsx(Alert, { variant: "info", description: "To borrow you need to supply an asset to be used as collateral." }, "supply-collateral")),
            isolationModeBorrowDisabled && (_jsx(Alert, { variant: "warning", description: "Collateral usage is limited because of Isolation mode." }, "isolation-warning")),
            eModeBorrowDisabled && isolationModeBorrowDisabled && (_jsx(Alert, { variant: "info", description: "Borrowing is unavailable because you\u2019ve enabled Efficiency Mode (E-Mode) and Isolation mode. To manage E-Mode and Isolation mode visit your Dashboard." }, "emode-and-isolation")),
            eModeBorrowDisabled && !isolationModeBorrowDisabled && (_jsx(Alert, { variant: "info", description: `Borrowing is unavailable because you’ve enabled Efficiency Mode (E-Mode) for ${getEmodeMessage(eModes[user.userEmodeCategoryId].label)} category. To manage E-Mode categories visit your Dashboard` }, "emode-category")),
            !eModeBorrowDisabled && isolationModeBorrowDisabled && (_jsx(Alert, { variant: "info", description: "Borrowing is unavailable because you\u2019re using Isolation mode. To manage Isolation mode visit your Dashboard" }, "isolation-only")),
            maxAmountToSupply === "0" &&
                supplyCap?.determineWarningDisplay({
                    supplyCap,
                    icon: false,
                }),
            maxAmountToBorrow === "0" &&
                borrowCap?.determineWarningDisplay({
                    borrowCap,
                    icon: false,
                }),
            reserve.isIsolated &&
                balance !== "0" &&
                user?.totalCollateralUSD !== "0" &&
                debtCeiling?.determineWarningDisplay({
                    debtCeiling,
                    icon: false,
                }),
        ].filter(Boolean),
    };
};
