import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, } from "./NavigationMenu";
export default {
    component: NavigationMenu,
};
export const NAVIGATION = [
    {
        key: "Trade",
        children: [{ key: "Swap" }, { key: "Otc" }],
    },
    {
        key: "Borrow",
        children: [{ key: "Dashboard" }, { key: "Markets" }, { key: "History" }],
    },
    {
        key: "Liquidity",
        children: [
            {
                key: "My Liquidity",
            },
            { key: "Pools" },
        ],
    },
    {
        key: "Wallet",
        children: [{ key: "Assets" }, { key: "Transactions" }],
    },
    {
        key: "Cross-Chain",
    },
    {
        key: "Stats",
        children: [{ key: "Overview" }, { key: "Treasury" }],
    },
    {
        key: "Staking",
    },
    {
        key: "Referrals",
    },
];
const Template = (args) => (_jsx(NavigationMenu, { ...args, children: _jsx(NavigationMenuList, { children: NAVIGATION.map(({ key, children }) => (_jsxs(NavigationMenuItem, { children: [_jsx(NavigationMenuTrigger, { children: key }), !!children?.length && (_jsx(NavigationMenuContent, { children: children.map(({ key }) => (_jsx(NavigationMenuLink, { children: key }, key))) }))] }, key))) }) }));
export const Default = {
    render: Template,
};
