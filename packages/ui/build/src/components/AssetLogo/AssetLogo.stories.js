import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Provider as TooltipProvider } from "@radix-ui/react-tooltip";
import { Stack } from "@/components/Stack";
import { AssetLogo, MultipleAssetLogoWrapper } from "./AssetLogo";
export default {
    component: AssetLogo,
};
const ETH_SRC = "https://cdn.jsdelivr.net/gh/galacticcouncil/intergalactic-asset-metadata@latest/v2/ethereum/1/icon.svg";
const AAVE_SRC = "https://cdn.jsdelivr.net/gh/galacticcouncil/intergalactic-asset-metadata@latest/v2/ethereum/1/assets/0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9/icon.svg";
const HDX_SRC = "https://cdn.jsdelivr.net/gh/galacticcouncil/intergalactic-asset-metadata@latest/v2/polkadot/2034/assets/0/icon.svg";
const USDT_SRC = "https://cdn.jsdelivr.net/gh/galacticcouncil/intergalactic-asset-metadata@latest/v2/polkadot/2034/assets/10/icon.svg";
const Template = (args) => (_jsx(TooltipProvider, { children: _jsxs(Stack, { gap: 20, children: [_jsx(AssetLogo, { ...args, size: "extra-small" }), _jsx(AssetLogo, { ...args, size: "small" }), _jsx(AssetLogo, { ...args, size: "medium" }), _jsx(AssetLogo, { ...args, size: "large" })] }) }));
const MultipleAssetsTemplate = (args) => (_jsxs(MultipleAssetLogoWrapper, { ...args, children: [_jsx(AssetLogo, { src: HDX_SRC }), _jsx(AssetLogo, { src: AAVE_SRC }), _jsx(AssetLogo, { src: ETH_SRC }), _jsx(AssetLogo, { src: USDT_SRC })] }));
export const Default = {
    render: Template,
    args: {
        src: HDX_SRC,
    },
};
export const WithChain = {
    render: Template,
    args: {
        src: AAVE_SRC,
        chainSrc: ETH_SRC,
    },
};
export const WithMultipleAssets = {
    render: () => (_jsxs(Stack, { gap: 20, children: [_jsx(MultipleAssetsTemplate, { size: "extra-small" }), _jsx(MultipleAssetsTemplate, { size: "small" }), _jsx(MultipleAssetsTemplate, { size: "medium" }), _jsx(MultipleAssetsTemplate, { size: "large" })] })),
};
export const WithAtokenDecoration = {
    render: (args) => (_jsxs(Stack, { gap: 20, children: [_jsx(Template, { ...args }), _jsx(MultipleAssetsTemplate, { decoration: args.decoration, size: "extra-small" }), _jsx(MultipleAssetsTemplate, { decoration: args.decoration, size: "small" }), _jsx(MultipleAssetsTemplate, { decoration: args.decoration, size: "medium" }), _jsx(MultipleAssetsTemplate, { decoration: args.decoration, size: "large" })] })),
    args: {
        decoration: "atoken",
        src: AAVE_SRC,
    },
};
export const WithYellowBadge = {
    render: Template,
    args: {
        badge: "yellow",
        badgeTooltip: "Warning",
        src: HDX_SRC,
    },
};
export const WithRedBadge = {
    render: Template,
    args: {
        badge: "red",
        badgeTooltip: "Danger",
        src: HDX_SRC,
    },
};
export const Placeholder = {
    render: Template,
};
