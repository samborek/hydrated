import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { useState } from "react";
import { getToken } from "@/utils";
import { Box } from "../Box";
import { AssetInput } from "./AssetInput";
export default {
    component: AssetInput,
};
const SPOT_PRICE = "0.1234";
const MAX_BALANCE = "12345";
const Template = (args) => {
    const [value, setValue] = useState();
    const displayValue = value !== undefined ? Number(SPOT_PRICE) * Number(value) : undefined;
    return (_jsx(Box, { width: 500, bg: getToken("surfaces.themeBasePalette.surfaceHigh"), height: 500, p: 24, children: _jsx(AssetInput, { ...args, value: args.value ?? value, maxBalance: args.maxBalance ?? MAX_BALANCE, displayValue: args.displayValue ?? displayValue?.toString(), onChange: setValue, label: "Sell" }) }));
};
export const Default = {
    render: (args) => _jsx(Template, { ...args }),
    args: {
        symbol: "HDX",
    },
};
export const EmptyAssetSelector = {
    render: (args) => _jsx(Template, { ...args }),
};
export const ErrorAssetSelector = {
    render: (args) => _jsx(Template, { ...args }),
    args: {
        symbol: "HDX",
        value: "1234",
        displayValue: "123",
        error: "Not enough balance",
    },
};
export const AssetSelectorWithNoMaxBalance = {
    render: (args) => _jsx(Template, { ...args }),
    args: {
        symbol: "HDX",
        maxBalance: "0",
    },
};
export const AssetSelectorLoading = {
    render: (args) => _jsx(Template, { ...args }),
    args: {
        loading: true,
    },
};
