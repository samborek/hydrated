import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Text } from "./Text";
export default {
    component: Text,
};
const PANGRAM = "The quick brown fox jumps over the lazy dog";
export const Default = {
    args: {
        children: PANGRAM,
    },
};
export const PrimaryRegular = {
    args: {
        children: PANGRAM,
        font: "primary",
        fw: 400,
    },
};
export const PrimaryMedium = {
    args: {
        children: PANGRAM,
        font: "primary",
        fw: 500,
    },
};
export const PrimaryBold = {
    args: {
        children: PANGRAM,
        font: "primary",
        fw: 600,
    },
};
export const SecondaryRegular = {
    args: {
        children: PANGRAM,
        font: "secondary",
        fw: 400,
    },
};
export const SecondaryMedium = {
    args: {
        children: PANGRAM,
        font: "secondary",
        fw: 500,
    },
};
export const SecondaryBold = {
    args: {
        children: PANGRAM,
        font: "secondary",
        fw: 600,
    },
};
export const Responsive = {
    args: {
        children: PANGRAM,
        font: "secondary",
        fw: [400, 500, 600],
        fs: [14, 22, 30],
    },
};
export const Colors = {
    render: (args) => (_jsxs(_Fragment, { children: [_jsx(Text, { ...args, color: "coral.700", children: PANGRAM }), _jsx(Text, { ...args, color: "utility.warningPrimary.300", children: PANGRAM }), _jsx(Text, { ...args, color: "skyBlue.600", children: PANGRAM }), _jsx(Text, { ...args, color: "successGreen.400", children: PANGRAM })] })),
    args: {
        children: PANGRAM,
        fs: 40,
        fw: 600,
    },
};
