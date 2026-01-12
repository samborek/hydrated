import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { AssetInput as BaseAssetInput, Flex, Modal, ModalBody, ModalHeader, Stack, Text, } from "@galacticcouncil/ui/components";
import { getToken } from "@galacticcouncil/ui/utils";
import Big from "big.js";
import { useState } from "react";
import { ReserveLogo } from "@/components/primitives/ReserveLogo";
import { useAppFormatters } from "@/hooks/app-data-provider/useAppFormatters";
export const AssetInput = ({ value, symbol, onChange, onSelect, assets, maxValue, loading = false, className, error, }) => {
    const { formatCurrency } = useAppFormatters();
    const [isAssetSelectOpen, setIsAssetSelectOpen] = useState(false);
    const asset = assets.length === 1
        ? assets[0]
        : assets && assets.find((asset) => asset.symbol === symbol);
    const hasMultipleAssets = assets.length > 1;
    return (_jsxs(_Fragment, { children: [_jsx(BaseAssetInput, { sx: { pt: 0 }, className: className, label: "Amount", symbol: symbol, value: value, maxBalance: Big(maxValue || 0)
                    .round(6, Big.roundDown)
                    .toString(), selectedAssetIcon: _jsx(ReserveLogo, { address: asset.address }), onAsssetBtnClick: hasMultipleAssets ? () => setIsAssetSelectOpen(true) : undefined, modalDisabled: !hasMultipleAssets, onChange: onChange, loading: loading, error: error }), _jsxs(Modal, { open: isAssetSelectOpen, onOpenChange: setIsAssetSelectOpen, children: [_jsx(ModalHeader, { title: "Select asset" }), _jsx(ModalBody, { sx: { p: 0 }, children: _jsx(Stack, { separated: true, children: assets.map((asset) => (_jsxs(Flex, { align: "center", justify: "space-between", py: 12, px: "var(--modal-content-padding)", sx: { cursor: "pointer" }, onClick: () => {
                                    onSelect?.(asset);
                                    onChange?.("");
                                    setIsAssetSelectOpen(false);
                                }, children: [_jsxs(Flex, { align: "center", gap: 8, children: [_jsx(ReserveLogo, { address: asset.address }), _jsx(Text, { color: getToken("text.high"), fs: "p5", fw: 600, lh: 1, children: asset.symbol })] }), _jsx(Flex, { direction: "column", align: "flex-end", children: _jsx(Text, { fs: "p4", fw: 500, color: getToken("text.high"), children: formatCurrency(asset.balance, { symbol: asset.symbol }) }) })] }, asset.address))) }) })] })] }));
};
