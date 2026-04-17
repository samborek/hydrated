import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { formatNumber } from "@galacticcouncil/utils";
import Big from "big.js";
import { ChevronDown } from "lucide-react";
import { MicroButton } from "../Button";
import { Flex } from "../Flex";
import { Icon } from "../Icon";
import { Skeleton } from "../Skeleton";
import { Text } from "../Text";
import { FormError } from "../FormError";
import { getToken } from "@/utils";
import { SAssetButton, SAssetButtonEmpty, SAssetInput, } from "./AssetInput.styled";
import { defaultAssetValueFormatter } from "./AssetInput.utils";
export const AssetInput = ({ symbol, selectedAssetIcon, value, displayValue, displayValueLoading, label, maxBalance, maxButtonBalance, ignoreBalance, ignoreDisplayValue, hideMaxBalanceAction, onChange, error, disabled, disabledInput, hideInput, modalDisabled, loading, onAsssetBtnClick, className, }) => {
    const usedMaxBalance = maxButtonBalance || maxBalance;
    const onMaxButtonClick = () => {
        if (usedMaxBalance)
            onChange?.(usedMaxBalance);
    };
    return (_jsxs(Flex, { direction: "column", gap: 12, sx: { position: "relative", py: 20, overflow: "hidden" }, className: className, children: [_jsxs(Flex, { align: "center", gap: 4, justify: "space-between", children: [label && (_jsx(Text, { color: getToken("text.medium"), fs: "p5", fw: 500, sx: {
                            width: "fit-content",
                            lineHeight: "120%",
                            whiteSpace: "nowrap",
                        }, children: label })), !ignoreBalance && (_jsxs(Flex, { align: "center", gap: 6, sx: { marginLeft: "auto" }, children: [_jsxs(Text, { as: "div", color: getToken("text.low"), fs: "p5", fw: 500, sx: {
                                    width: "fit-content",
                                    lineHeight: "120%",
                                    whiteSpace: "nowrap",
                                }, children: [_jsx("span", { children: "Balance: " }), loading ? (_jsx("span", { sx: { height: 12, lineHeight: 1 }, children: _jsx(Skeleton, { width: 48, height: 12 }) })) : (_jsx("span", { children: maxBalance ? formatNumber(maxBalance) : "" }))] }), !hideMaxBalanceAction && (_jsx(MicroButton, { "aria-label": "Max balance button", onClick: onMaxButtonClick, disabled: Big(usedMaxBalance || "0").lte(0) ||
                                    loading ||
                                    !onChange ||
                                    !!disabled, children: "max" }))] }))] }), _jsxs(Flex, { direction: "column", children: [_jsxs(Flex, { align: "center", justify: "space-between", gap: 12, children: [_jsx(AssetButton, { sx: { ...(hideInput && { flex: 1 }) }, symbol: symbol, icon: selectedAssetIcon, loading: loading, error: !!error, onAsssetBtnClick: onAsssetBtnClick, disabled: !!modalDisabled || !!disabled }), !hideInput && (_jsxs(Flex, { direction: "column", height: 38, justify: "space-evenly", align: "end", flex: 1, children: [_jsx(SAssetInput, { isError: !!error, placeholder: "0", variant: "embedded", disabled: disabled || loading || !onChange || disabledInput, value: defaultAssetValueFormatter(value ?? ""), onChange: (e) => {
                                            if (e.target.validity.valid) {
                                                const formattedValue = e.target.value
                                                    .replace(/\s+/g, "")
                                                    .replace(/,/g, ".");
                                                if (!isNaN(Number(formattedValue))) {
                                                    onChange?.(formattedValue);
                                                }
                                            }
                                        } }), !ignoreDisplayValue && (_jsx(Text, { color: getToken("text.low"), fs: 10, fw: 400, sx: { width: "fit-content" }, children: displayValueLoading ? _jsx(Skeleton, { width: 48 }) : displayValue }))] }))] }), error && _jsx(FormError, { ml: "auto", children: error })] })] }));
};
export const AssetButton = ({ loading, symbol, error, icon, disabled, className, onAsssetBtnClick, }) => {
    if (loading)
        return (_jsxs(Flex, { direction: "column", height: 38, gap: 2, justify: "center", className: className, children: [_jsx("div", { sx: { height: 12, lineHeight: 1 }, children: _jsx(Skeleton, { width: 24, height: 12 }) }), _jsx("div", { sx: { height: 12, lineHeight: 1 }, children: _jsx(Skeleton, { sx: { minWidth: 48 }, width: "100%", height: 12 }) })] }));
    if (symbol && icon)
        return (_jsxs(SAssetButton, { className: className, type: "button", disabled: !!disabled, isError: !!error, onClick: onAsssetBtnClick, children: [icon, _jsxs(Flex, { flex: 1, align: "center", gap: 4, justify: "space-between", children: [_jsx(Text, { color: getToken("text.high"), fw: 600, fs: "p3", whiteSpace: "nowrap", children: symbol }), onAsssetBtnClick && (_jsx(Icon, { size: 20, mr: -8, component: ChevronDown, color: getToken("icons.onContainer") }))] })] }));
    return (_jsxs(SAssetButtonEmpty, { variant: "secondary", sx: { justifyContent: "space-between" }, className: className, onClick: onAsssetBtnClick, children: [_jsx(Text, { fw: 600, fs: "p3", whiteSpace: "nowrap", children: "Select asset" }), !disabled && _jsx(Icon, { size: 20, component: ChevronDown })] }));
};
