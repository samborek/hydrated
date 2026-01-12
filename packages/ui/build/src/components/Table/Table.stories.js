import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { AssetLogo } from "@/components/AssetLogo";
import { Flex } from "@/components/Flex";
import { Paper } from "@/components/Paper";
import { Text } from "@/components/Text";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow, } from "./Table";
export default {
    component: Table,
};
const TABLE_DATA = [
    {
        id: "1",
        symbol: "BTC",
        price: "$102,381.92",
        marketCap: "$1.8T",
        changeIn24h: "-2.34%",
    },
    {
        id: "1027",
        symbol: "ETH",
        price: "$3,012.77",
        marketCap: "$392B",
        changeIn24h: "+3.21%",
    },
    {
        id: "1839",
        symbol: "BNB",
        price: "$687.27",
        marketCap: "$100B",
        changeIn24h: "+1.12%",
    },
    {
        id: "52",
        symbol: "XRP",
        price: "$2.30",
        marketCap: "$132B",
        changeIn24h: "-0.56%",
    },
    {
        id: "5426",
        symbol: "SOL",
        price: "$188.27",
        marketCap: "$91B",
        changeIn24h: "+5.01%",
    },
    {
        id: "6753",
        symbol: "HDX",
        price: "$0.01",
        marketCap: "$38M",
        changeIn24h: "+1.34%",
    },
];
const Template = (args) => (_jsx(TableContainer, { as: Paper, children: _jsxs(Table, { ...args, children: [_jsxs(TableHeader, { children: [_jsx(TableHead, { children: "Symbol" }), _jsx(TableHead, { canSort: true, children: "Price" }), _jsx(TableHead, { canSort: true, children: "Market Cap" }), _jsx(TableHead, { canSort: true, children: "24h %" })] }), _jsx(TableBody, { children: TABLE_DATA.map(({ id, symbol, price, marketCap, changeIn24h }) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsxs(Flex, { align: "center", gap: 8, children: [_jsx(AssetLogo, { src: `https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png` }), _jsx(Text, { fw: 600, children: symbol })] }) }), _jsx(TableCell, { children: price }), _jsx(TableCell, { children: marketCap }), _jsx(TableCell, { children: _jsx(Text, { color: changeIn24h.includes("+")
                                    ? "successGreen.500"
                                    : "utility.red.500", children: changeIn24h }) })] }, id))) })] }) }));
export const Default = {
    render: Template,
    args: {
        size: "large",
    },
};
export const SmallSize = {
    render: Template,
    args: {
        size: "small",
    },
};
export const MediumSize = {
    render: Template,
    args: {
        size: "medium",
    },
};
export const LargeSize = {
    render: Template,
    args: {
        size: "large",
    },
};
export const Borderless = {
    render: Template,
    args: {
        borderless: true,
    },
};
