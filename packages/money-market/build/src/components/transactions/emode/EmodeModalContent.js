import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { formatUserSummary } from "@aave/math-utils";
import { ArrowRight } from "@galacticcouncil/ui/assets/icons";
import { Alert, Flex, Icon, Separator, Stack, SummaryRow, Text, Toggle, } from "@galacticcouncil/ui/components";
import { getToken } from "@galacticcouncil/ui/utils";
import { useState } from "react";
import { HealthFactorChange } from "@/components/primitives";
import { useAppDataContext, } from "@/hooks/app-data-provider/useAppDataProvider";
import { useAppFormatters } from "@/hooks/app-data-provider/useAppFormatters";
import { useCurrentTimestamp } from "@/hooks/useCurrentTimestamp";
import { getEmodeMessage } from "./emode.utils";
import { EmodeActions } from "./EmodeActions";
import { EmodeSelect } from "./EmodeSelect";
export var ErrorType;
(function (ErrorType) {
    ErrorType[ErrorType["EMODE_DISABLED_LIQUIDATION"] = 0] = "EMODE_DISABLED_LIQUIDATION";
    ErrorType[ErrorType["CLOSE_POSITIONS_BEFORE_SWITCHING"] = 1] = "CLOSE_POSITIONS_BEFORE_SWITCHING";
    ErrorType[ErrorType["CLOSE_POSITIONS_BEFORE_DISABLING"] = 2] = "CLOSE_POSITIONS_BEFORE_DISABLING";
})(ErrorType || (ErrorType = {}));
export var EmodeModalType;
(function (EmodeModalType) {
    EmodeModalType["ENABLE"] = "Enable";
    EmodeModalType["DISABLE"] = "Disable";
    EmodeModalType["SWITCH"] = "Manage";
})(EmodeModalType || (EmodeModalType = {}));
function getInitialEmode(mode, eModes, currentEmode) {
    if (mode === EmodeModalType.ENABLE) {
        return eModes[1];
    }
    if (mode === EmodeModalType.SWITCH) {
        if (currentEmode === 1)
            return eModes[2];
        return eModes[1];
    }
    return eModes[0];
}
export const EmodeModalContent = ({ mode }) => {
    const { user, reserves, eModes, marketReferenceCurrencyDecimals, marketReferencePriceInUsd, userReserves, } = useAppDataContext();
    const { formatPercent } = useAppFormatters();
    const currentTimestamp = useCurrentTimestamp(1);
    const [selectedEmode, setSelectedEmode] = useState(getInitialEmode(mode, eModes, user.userEmodeCategoryId));
    const [disableMode, setDisableMode] = useState(false);
    // calcs
    const newSummary = formatUserSummary({
        currentTimestamp,
        userReserves: userReserves,
        formattedReserves: reserves,
        userEmodeCategoryId: selectedEmode ? selectedEmode.id : 0,
        marketReferenceCurrencyDecimals,
        marketReferencePriceInUsd,
    });
    // error handling
    let blockingError = undefined;
    // if user is disabling eMode
    if (user.isInEmode && selectedEmode?.id === 0) {
        if (Number(newSummary.healthFactor) < 1.01 &&
            newSummary.healthFactor !== "-1") {
            blockingError = ErrorType.EMODE_DISABLED_LIQUIDATION; // intl.formatMessage(messages.eModeDisabledLiquidation);
        }
    }
    else if (selectedEmode && user.userEmodeCategoryId !== selectedEmode?.id) {
        // check if user has open positions different than future emode
        const hasIncompatiblePositions = user.userReservesData.some((userReserve) => (Number(userReserve.scaledVariableDebt) > 0 ||
            Number(userReserve.principalStableDebt) > 0) &&
            userReserve.reserve.eModeCategoryId !== selectedEmode?.id);
        if (hasIncompatiblePositions) {
            if (disableMode) {
                blockingError = ErrorType.CLOSE_POSITIONS_BEFORE_DISABLING;
            }
            else {
                blockingError = ErrorType.CLOSE_POSITIONS_BEFORE_SWITCHING;
            }
        }
    }
    // render error messages
    const BlockingError = () => {
        switch (blockingError) {
            case ErrorType.CLOSE_POSITIONS_BEFORE_SWITCHING:
                return (_jsx(Alert, { variant: "info", description: `To enable E-mode for the ${selectedEmode && getEmodeMessage(selectedEmode.label)} category, all borrow positions outside of this category must be closed.` }));
            case ErrorType.CLOSE_POSITIONS_BEFORE_DISABLING:
                return (_jsx(Alert, { variant: "info", description: `To disable E-mode for the ${selectedEmode && getEmodeMessage(eModes[user.userEmodeCategoryId].label)} category, all borrow positions within this category must be closed.` }));
            case ErrorType.EMODE_DISABLED_LIQUIDATION:
                return (_jsx(Alert, { variant: "error", title: "Cannot disable E-Mode", description: "You can not disable E-Mode as your current collateralization level is above 80%, disabling E-Mode can cause liquidation. To exit E-Mode supply or repay borrowed positions." }));
            default:
                return null;
        }
    };
    // The selector only shows if there are 2 options for the user, which happens when there are 3 emodeCategories (including disable) for mode.enable, and 4 emodeCategories in mode.switch
    const showCategorySelect = (Object.keys(eModes).length >= 3 && mode === EmodeModalType.ENABLE) ||
        (Object.keys(eModes).length >= 4 && mode === EmodeModalType.SWITCH);
    // Shown only if the user is disabling eMode, is not blocked from disabling, and has a health factor that is decreasing
    // HF will never decrease on enable or switch because all borrow positions must initially be in the eMode category
    const showLiquidationRiskAlert = !!selectedEmode &&
        selectedEmode.id === 0 &&
        blockingError === undefined &&
        Number(newSummary.healthFactor).toFixed(3) <
            Number(user.healthFactor).toFixed(3); // Comparing without rounding causes stuttering, HFs update asyncronously
    // Shown only if the user has a collateral asset which is changing in LTV
    const showMaxLTVRow = user.currentLoanToValue !== "0" &&
        Number(newSummary.currentLoanToValue).toFixed(3) !==
            Number(user.currentLoanToValue).toFixed(3); // Comparing without rounding causes stuttering, LTVs update asyncronously
    const healthFactor = user ? user.healthFactor : "-1";
    const futureHealthFactor = newSummary.healthFactor.toString();
    const shouldRenderHealthFactor = healthFactor !== "-1" && futureHealthFactor !== "-1";
    const isUserEmodeCategorySet = user.userEmodeCategoryId !== 0;
    return (_jsxs(_Fragment, { children: [isUserEmodeCategorySet && (_jsxs(_Fragment, { children: [_jsxs(Flex, { as: "label", justify: "space-between", align: "center", gap: 4, bg: getToken("surfaces.containers.dim.dimOnBg"), p: 20, mb: "var(--modal-content-padding)", borderRadius: "lg", children: [_jsx(Text, { fs: "p2", fw: 700, lh: 1, children: "Disable E-Mode" }), _jsx(Toggle, { checked: disableMode, onCheckedChange: setDisableMode, name: "Disable e-mode", size: "large" })] }), _jsx(Separator, { mx: "var(--modal-content-inset)" })] })), !disableMode && (_jsxs(Stack, { mt: !isUserEmodeCategorySet && "var(--modal-content-inset)", separated: true, separator: _jsx(Separator, { mx: "var(--modal-content-inset)" }), withTrailingSeparator: true, children: [!showCategorySelect && (_jsx(SummaryRow, { label: "E-Mode category", content: _jsxs(Flex, { gap: 4, justify: "flex-end", align: "center", children: [_jsx(Flex, { align: "center", justify: "flex-end", children: user.userEmodeCategoryId !== 0 ? (_jsx(Text, { fw: 500, children: getEmodeMessage(eModes[user.userEmodeCategoryId].label) })) : (_jsx(Text, { fw: 500, children: "None" })) }), selectedEmode && (_jsxs(_Fragment, { children: [_jsx(Icon, { size: 14, component: ArrowRight }), _jsx(Flex, { align: "center", justify: "flex-end", children: selectedEmode.id !== 0 ? (_jsx(Text, { fw: 500, color: getToken("accents.success.emphasis"), children: getEmodeMessage(eModes[selectedEmode.id].label) })) : (_jsx(Text, { fw: 500, color: getToken("accents.success.emphasis"), children: "None" })) })] }))] }) })), showCategorySelect && (_jsx(SummaryRow, { label: "E-Mode category", content: _jsx(EmodeSelect, { emodeCategories: eModes, selectedEmode: selectedEmode?.id, setSelectedEmode: setSelectedEmode, userEmode: user.userEmodeCategoryId }) })), _jsx(SummaryRow, { label: "Available assets", content: _jsxs(Flex, { gap: 6, justify: "flex-end", align: "center", maxWidth: "50%", children: [eModes[user.userEmodeCategoryId] && (_jsx(Flex, { align: "center", justify: "flex-end", children: user.userEmodeCategoryId !== 0 ? (_jsx(Text, { fw: 500, align: "right", children: eModes[user.userEmodeCategoryId].assets.join(", ") })) : (_jsx(Text, { align: "right", fw: 500, whiteSpace: "nowrap", children: "All Assets" })) })), selectedEmode && (_jsxs(_Fragment, { children: [_jsx(Icon, { size: 14, component: ArrowRight, sx: { flexShrink: 0 } }), _jsx(Flex, { align: "center", justify: "flex-end", children: selectedEmode?.id !== 0 ? (_jsx(Text, { fw: 500, align: "right", color: getToken("accents.success.emphasis"), children: selectedEmode.assets.join(", ") })) : (_jsx(Text, { fw: 500, align: "right", color: getToken("accents.success.emphasis"), children: "All Assets" })) })] }))] }) }), shouldRenderHealthFactor && (_jsx(SummaryRow, { label: "Health Factor", content: _jsx(HealthFactorChange, { healthFactor: healthFactor, futureHealthFactor: futureHealthFactor }) })), showMaxLTVRow && (_jsx(SummaryRow, { label: "Maximum loan to value", content: _jsxs(Flex, { align: "center", justify: "flex-end", gap: 4, children: [_jsx(Text, { fw: 500, children: formatPercent(Number(user.currentLoanToValue) * 100) }), selectedEmode !== undefined && (_jsxs(_Fragment, { children: [_jsx(Icon, { size: 14, component: ArrowRight }), _jsx(Text, { fw: 500, children: formatPercent(Number(newSummary.currentLoanToValue) * 100) })] }))] }) }))] })), _jsxs(Stack, { gap: 14, py: 14, children: [(blockingError === ErrorType.CLOSE_POSITIONS_BEFORE_SWITCHING ||
                        blockingError === ErrorType.CLOSE_POSITIONS_BEFORE_DISABLING) && (_jsx(BlockingError, {})), user.userEmodeCategoryId === 0 && (_jsx(Alert, { variant: "warning", description: " Enabling E-Mode only allows you to borrow assets belonging to the selected category." })), blockingError === ErrorType.EMODE_DISABLED_LIQUIDATION && (_jsx(BlockingError, {})), showLiquidationRiskAlert && (_jsx(Alert, { variant: "error", title: "Liquidation risk", description: "This action will reduce your health factor. Please be mindful of the increased risk of collateral liquidation." }))] }), _jsx(Separator, { mx: "var(--modal-content-inset)" }), _jsx(EmodeActions, { blocked: blockingError !== undefined || !selectedEmode, selectedEmode: disableMode ? 0 : selectedEmode?.id || 0, activeEmode: user.userEmodeCategoryId, eModes: eModes })] }));
};
