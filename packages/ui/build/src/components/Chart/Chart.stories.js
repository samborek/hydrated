import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { PlusIcon } from "lucide-react";
import { MOCK_CATEGORY_DATA, MOCK_CURVE_DATA, MOCK_TIME_DATA, } from "@/components/Chart/utils";
import { ChartContainer } from "./ChartContainer";
import { AreaChart } from "./charts/AreaChart";
import { BarChart } from "./charts/BarChart";
export default {
    component: ChartContainer,
};
const SINGLE_SERIES_CONFIG = {
    xAxisKey: "month",
    series: [
        {
            key: "desktop",
            label: "Desktop",
            color: "#6fc272",
        },
    ],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
};
const MULTI_SERIES_CONFIG = {
    xAxisKey: "month",
    series: [
        {
            key: "desktop",
            label: "Desktop",
            color: "#6fc272",
        },
        {
            key: "mobile",
            label: "Mobile",
            color: "#98C8F8",
        },
    ],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
};
const TIME_SERIES_CONFIG = {
    xAxisKey: "timestamp",
    xAxisType: "time",
    tooltipType: "timeTop",
    series: [
        {
            label: "Value",
            key: "value",
        },
    ],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
};
const CURVE_SERIES_CONFIG = {
    xAxisKey: "x",
    series: [
        {
            key: "y",
            label: "Value",
            color: ["#FC408C", "#57B3EB"],
        },
    ],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
};
export const Area = {
    render: (args) => (_jsx(AreaChart, { height: 400, ...args, data: MOCK_CATEGORY_DATA })),
    args: {
        height: 400,
        config: SINGLE_SERIES_CONFIG,
    },
};
export const AreaLabels = {
    render: (args) => (_jsx(AreaChart, { height: 400, ...args, data: MOCK_CATEGORY_DATA, yAxisLabel: "Device Usage", xAxisLabel: "Month", yAxisProps: { tickCount: 2 }, xAxisProps: { tick: false } })),
    args: {
        height: 400,
        config: SINGLE_SERIES_CONFIG,
    },
};
export const AreaMultiSeries = {
    render: (args) => _jsx(AreaChart, { ...args, data: MOCK_CATEGORY_DATA }),
    args: {
        height: 400,
        config: MULTI_SERIES_CONFIG,
    },
};
export const AreaLinearCurve = {
    render: (args) => (_jsx(AreaChart, { ...args, data: MOCK_CATEGORY_DATA, curveType: "linear" })),
    args: {
        height: 400,
        config: MULTI_SERIES_CONFIG,
    },
};
export const AreaTimeTooltip = {
    render: (args) => _jsx(AreaChart, { ...args, data: MOCK_TIME_DATA }),
    args: {
        height: 400,
        config: TIME_SERIES_CONFIG,
    },
};
export const AreaHiddenTooltip = {
    render: (args) => _jsx(AreaChart, { ...args, data: MOCK_TIME_DATA }),
    args: {
        height: 400,
        config: {
            ...TIME_SERIES_CONFIG,
            tooltipType: "none",
        },
    },
};
export const AreaHiddenAxes = {
    render: (args) => (_jsx(AreaChart, { ...args, data: MOCK_TIME_DATA, yAxisHidden: true, xAxisHidden: true, verticalGridHidden: true, horizontalGridHidden: true })),
    args: {
        height: 400,
        config: TIME_SERIES_CONFIG,
    },
};
export const AreaGradientLine = {
    render: (args) => (_jsx(AreaChart, { ...args, data: MOCK_CURVE_DATA, gradient: "line", xAxisProps: { type: "number", tickCount: 10, interval: "preserveStart" }, yAxisProps: { type: "number", padding: { bottom: 2 } }, strokeWidth: 4 })),
    args: {
        height: 400,
        config: CURVE_SERIES_CONFIG,
    },
};
export const AreaCustomDot = {
    render: (args) => (_jsx(AreaChart, { ...args, data: MOCK_CURVE_DATA, gradient: "line", xAxisProps: { type: "number", tickCount: 10, interval: "preserveStart" }, yAxisProps: { type: "number", tickCount: 2, padding: { bottom: 16 } }, yAxisLabel: "Payable Percentage", xAxisLabel: "Days", strokeWidth: 4, customDot: ({ key, payload, cx = 0, cy = 0 }) => (_jsxs(_Fragment, { children: [payload.current && (_jsx(PlusIcon, { x: cx - 12, y: cy - 12, color: "#FFD230" }, key)), payload.currentSecondary && (_jsx(PlusIcon, { x: cx - 12, y: cy - 12, color: "#ED6AFF" }, key))] })) })),
    args: {
        height: 400,
        config: CURVE_SERIES_CONFIG,
    },
};
export const Bar = {
    render: (args) => _jsx(BarChart, { ...args, data: MOCK_CATEGORY_DATA }),
    args: {
        height: 400,
        config: SINGLE_SERIES_CONFIG,
    },
};
export const BarLabels = {
    render: (args) => (_jsx(BarChart, { height: 400, ...args, data: MOCK_CATEGORY_DATA, yAxisLabel: "Device Usage", xAxisLabel: "Month", yAxisProps: { tickCount: 2 }, xAxisProps: { tick: false } })),
    args: {
        height: 400,
        config: SINGLE_SERIES_CONFIG,
    },
};
export const BarMultiSeries = {
    render: (args) => _jsx(BarChart, { ...args, data: MOCK_CATEGORY_DATA }),
    args: {
        height: 400,
        config: MULTI_SERIES_CONFIG,
    },
};
export const BarCustomBarSize = {
    render: (args) => (_jsx(BarChart, { ...args, data: MOCK_CATEGORY_DATA, barSize: 10 })),
    args: {
        height: 400,
        config: MULTI_SERIES_CONFIG,
    },
};
export const BarStacked = {
    render: (args) => _jsx(BarChart, { ...args, data: MOCK_CATEGORY_DATA, stacked: true }),
    args: {
        height: 400,
        config: MULTI_SERIES_CONFIG,
    },
};
export const BarVerticalLayout = {
    render: (args) => (_jsx(BarChart, { ...args, data: MOCK_CATEGORY_DATA, layout: "vertical", stacked: true })),
    args: {
        height: 600,
        config: MULTI_SERIES_CONFIG,
    },
};
export const BarTimeTooltip = {
    render: (args) => _jsx(BarChart, { ...args, data: MOCK_TIME_DATA }),
    args: {
        height: 400,
        config: {
            ...TIME_SERIES_CONFIG,
            tooltipType: "timeTop",
        },
    },
};
export const BarHiddenTooltip = {
    render: (args) => _jsx(BarChart, { ...args, data: MOCK_CATEGORY_DATA }),
    args: {
        height: 400,
        config: {
            ...SINGLE_SERIES_CONFIG,
            tooltipType: "none",
        },
    },
};
export const BarHiddenAxes = {
    render: (args) => (_jsx(BarChart, { ...args, data: MOCK_CATEGORY_DATA, yAxisHidden: true, xAxisHidden: true, verticalGridHidden: true })),
    args: {
        height: 400,
        config: SINGLE_SERIES_CONFIG,
    },
};
