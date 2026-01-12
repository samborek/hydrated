import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { useState } from "@storybook/preview-api";
import { createColumnHelper } from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AssetLogo } from "@/components/AssetLogo";
import { Box } from "@/components/Box";
import { Button } from "@/components/Button";
import { Flex } from "@/components/Flex";
import { Grid } from "@/components/Grid";
import { Input } from "@/components/Input";
import { Paper } from "@/components/Paper";
import { TableContainer } from "@/components/Table";
import { Text } from "@/components/Text";
import { getToken } from "@/utils";
import { DataTable } from "./DataTable";
export default {
    component: DataTable,
};
const columnHelper = createColumnHelper();
const formatters = {
    value: new Intl.NumberFormat("en"),
    usd: new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
    }),
    usdCompact: new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
        notation: "compact",
    }),
    percentage: new Intl.NumberFormat("en", {
        style: "percent",
        minimumFractionDigits: 2,
        signDisplay: "exceptZero",
    }),
};
const createRandomCoin = (index) => ({
    id: `${index + 1}`,
    symbol: `Coin ${index + 1}`,
    price: Math.random() * 100,
    marketCap: Math.random() * 1000000000,
    changeIn24h: Math.random() * 10 - 1,
    volume: Math.random() * 100000,
    circulatingSupply: Math.random() * 1000000,
    totalSupply: Math.random() * 1000000000,
});
const TABLE_DATA = [
    {
        id: "1",
        symbol: "BTC",
        price: 102381.92,
        marketCap: 1_836_894_875_779,
        changeIn24h: -0.0234,
    },
    {
        id: "1027",
        symbol: "ETH",
        price: 3012.77,
        marketCap: 392_141_215_229,
        changeIn24h: 0.0321,
    },
    {
        id: "1839",
        symbol: "BNB",
        price: 687.27,
        marketCap: 100_330_387_639,
        changeIn24h: 0.0112,
    },
    {
        id: "52",
        symbol: "XRP",
        price: 2.3,
        marketCap: 132_226_504_847,
        changeIn24h: -0.0056,
    },
    {
        id: "5426",
        symbol: "SOL",
        price: 188.27,
        marketCap: 90_964_630_797,
        changeIn24h: 0.0501,
    },
    {
        id: "6753",
        symbol: "HDX",
        price: 0.01005,
        marketCap: 37_540_643,
        changeIn24h: 0.0134,
    },
];
const LARGE_TABLE_DATA = Array.from({ length: 1000 }, (_, index) => ({
    ...createRandomCoin(index),
    ...TABLE_DATA[index],
}));
const TABLE_COLUMNS = [
    columnHelper.accessor("symbol", {
        enableSorting: false,
        header: "Symbol",
        cell: ({ row, getValue }) => {
            return (_jsxs(Flex, { align: "center", gap: 8, children: [_jsx(AssetLogo, { src: `https://s2.coinmarketcap.com/static/img/coins/64x64/${row.original.id}.png` }), _jsx(Text, { fw: 600, whiteSpace: "nowrap", children: getValue() })] }));
        },
    }),
    columnHelper.accessor("price", {
        header: "Price",
        cell: ({ getValue }) => formatters.usd.format(getValue()),
        meta: {
            sx: {
                textAlign: "end",
            },
        },
    }),
    columnHelper.accessor("price", {
        header: "Price",
        cell: ({ getValue }) => formatters.usd.format(getValue()),
        meta: {
            sx: {
                textAlign: "end",
            },
        },
    }),
    columnHelper.accessor("price", {
        header: "Price",
        cell: ({ getValue }) => formatters.usd.format(getValue()),
        meta: {
            sx: {
                textAlign: "end",
            },
        },
    }),
    columnHelper.accessor("marketCap", {
        header: "Market Cap",
        cell: ({ getValue }) => formatters.usdCompact.format(getValue()),
        meta: {
            sx: {
                textAlign: ["end", "end", "end", "center"],
            },
        },
    }),
    columnHelper.accessor("changeIn24h", {
        header: "24h %",
        meta: {
            sx: {
                textAlign: "end",
            },
        },
        cell: ({ getValue }) => {
            return (_jsx(Text, { color: getValue() > 0 ? "successGreen.500" : "utility.red.500", children: formatters.percentage.format(getValue()) }));
        },
    }),
    columnHelper.display({
        id: "actions",
        meta: {
            sx: {
                textAlign: "end",
            },
        },
        cell: ({ row }) => (_jsxs(Flex, { gap: 8, inline: true, children: [_jsx(Button, { size: "small", onClick: () => alert("SWAP"), sx: { display: ["none", null, null, "inline-flex"] }, children: "Swap" }), _jsx(Button, { size: "small", variant: "secondary", onClick: () => alert("TRANSFER"), sx: { display: ["none", null, null, "inline-flex"] }, children: "Transfer" }), row.getCanExpand() && (_jsx("button", { type: "button", onClick: row.getToggleExpandedHandler(), sx: { cursor: "pointer" }, children: row.getIsExpanded() ? _jsx(ChevronUp, {}) : _jsx(ChevronDown, {}) }))] })),
    }),
];
const MockTable = (args) => {
    const [search, setSearch] = useState(args?.globalFilter);
    return (_jsxs(TableContainer, { as: Paper, children: [typeof args?.globalFilter === "string" && (_jsx(Box, { p: 10, children: _jsx(Input, { variant: "standalone", customSize: "small", placeholder: "Search...", value: search, onChange: (e) => setSearch(e.target.value) }) })), _jsx(DataTable, { ...args, globalFilter: search, data: args?.data || LARGE_TABLE_DATA.slice(0, 6), columns: TABLE_COLUMNS, renderSubComponent: (coin) => (_jsxs(Grid, { columns: [1, 2, 3], gap: 10, py: 20, children: [_jsxs(Box, { children: [_jsx(Text, { color: getToken("text.low"), children: "Volume" }), _jsx(Text, { fw: 600, fs: "p1", children: formatters.usdCompact.format(coin.volume) })] }), _jsxs(Box, { children: [_jsx(Text, { color: getToken("text.low"), children: "Circulating supply" }), _jsxs(Text, { fw: 600, fs: "p1", children: [formatters.value.format(coin.circulatingSupply), " ", coin.symbol] })] }), _jsxs(Box, { children: [_jsx(Text, { color: getToken("text.low"), children: "Total Supply" }), _jsxs(Text, { fw: 600, fs: "p1", children: [formatters.value.format(coin.totalSupply), " ", coin.symbol] })] })] })) })] }));
};
export const Default = {
    render: MockTable,
};
export const WithSkeletons = {
    render: MockTable,
    args: {
        fixedLayout: true,
        isLoading: true,
        skeletonRowCount: TABLE_DATA.length,
    },
};
export const WithSearch = {
    render: MockTable,
    args: {
        fixedLayout: true,
        globalFilter: "btc",
    },
};
export const WithExpandableRows = {
    render: MockTable,
    args: {
        fixedLayout: true,
        expandable: true,
    },
};
export const WithPagination = {
    render: MockTable,
    args: {
        fixedLayout: true,
        paginated: true,
        pageSize: 6,
        data: LARGE_TABLE_DATA,
    },
};
export const WithPinnedColumn = {
    render: MockTable,
    args: {
        paginated: true,
        pageSize: 6,
        data: LARGE_TABLE_DATA,
        columnPinning: {
            left: ["symbol"],
        },
    },
};
