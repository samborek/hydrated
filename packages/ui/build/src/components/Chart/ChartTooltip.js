import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Flex } from "../Flex";
import { Grid } from "../Grid";
import { Text } from "../Text";
import { ChartCrosshair } from "./ChartCrosshair";
import { useChart } from "./ChartContainer";
import { STooltipContainer } from "@/components/Chart/ChartTooltip.styled";
import { dateFormatter, getColorSet, timeFormatter, } from "./utils";
import { useTheme } from "@/theme";
import { getToken } from "@/utils";
const ChartTooltipLegendLabel = ({ payload = [], labelFormatter, }) => {
    const { config } = useChart();
    if (!payload.length)
        return null;
    const [item] = payload;
    const value = item.payload[config.xAxisKey];
    const formattedValue = labelFormatter ? labelFormatter(value, payload) : value;
    return (_jsxs(Flex, { justify: "space-between", children: [config.seriesLabel && (_jsx(Text, { fs: 14, fw: 500, children: config.seriesLabel })), _jsx(Text, { fs: 14, fw: 500, align: "left", children: formattedValue })] }));
};
export const ChartTooltipLegendType = ({ active, payload, labelFormatter, formatter, }) => {
    const { config } = useChart();
    const { themeProps: theme } = useTheme();
    if (!active || !payload?.length) {
        return null;
    }
    return (_jsxs(STooltipContainer, { children: [_jsx(ChartTooltipLegendLabel, { payload: payload, labelFormatter: labelFormatter }), _jsx(Grid, { gap: 4, children: payload.map((item, index) => {
                    const key = `${item.name || item.dataKey || "value"}`;
                    const itemConfig = config.series.find((s) => s.key === key);
                    const colors = getColorSet(itemConfig?.color, theme.details.chart);
                    const formatted = formatter && item?.value !== undefined && item.name
                        ? formatter(item.value, item.name, item, index, item.payload)
                        : item.value;
                    return (_jsxs(Flex, { gap: 8, align: "center", children: [_jsx(Flex, { sx: {
                                    background: colors.primary,
                                    flexShrink: 0,
                                    size: 10,
                                    borderRadius: 2,
                                } }), _jsxs(Flex, { justify: "space-between", gap: 20, sx: { flex: 1 }, children: [itemConfig?.label && (_jsx(Text, { color: getToken("text.medium"), fs: 14, fw: 500, lh: 1, children: itemConfig.label })), _jsx(Text, { color: getToken("text.high"), fs: 14, fw: 500, lh: 1, align: "end", sx: {
                                            fontVariantNumeric: "tabular-nums",
                                        }, children: formatted })] })] }, typeof item.dataKey === "function"
                        ? item.dataKey(index)
                        : item.dataKey));
                }) })] }));
};
export const ChartTooltipTimeType = ({ active, payload, coordinate, }) => {
    const { config } = useChart();
    if (!active || !payload?.length || !coordinate) {
        return null;
    }
    if (config.xAxisType !== "time") {
        throw new Error("Tooltip type and xAxisType are not compatible");
    }
    const [item] = payload;
    const value = item.payload[config.xAxisKey];
    const placement = config.tooltipType === "timeBottom" ? "bottom" : "top";
    return (_jsx("div", { css: {
            position: "absolute",
            width: "fit-content",
            left: coordinate.x,
            transform: "translateX(-50%)",
            [placement]: 0,
        }, children: _jsx(ChartCrosshair, { date: dateFormatter.format(value), time: timeFormatter.format(value) }) }));
};
export const ChartTooltip = (props) => {
    const { config } = useChart();
    if (config.tooltipType === "none") {
        return null;
    }
    if (config.tooltipType === "legend") {
        return _jsx(ChartTooltipLegendType, { ...props });
    }
    return _jsx(ChartTooltipTimeType, { ...props });
};
