import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Fragment } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { useId, useState } from "react";
import { Area, AreaChart as AreaChartPrimitive, CartesianGrid, Label, ReferenceLine, Tooltip, XAxis, YAxis, } from "recharts";
import { isNumber, isString } from "remeda";
import { ChartContainer } from "@/components/Chart";
import { ChartTooltip } from "@/components/Chart/ChartTooltip";
import { getAxisLabelProps, getColorSet, getConfigWithDefaults, getDerivedChartProps, pickPrimarySeries, } from "@/components/Chart/utils";
import { useTheme } from "@/theme";
export function AreaChart({ data, config, height, aspectRatio, horizontalGridHidden = true, verticalGridHidden = false, gridHorizontalValues, gridVerticalValues, xAxisHidden = false, yAxisHidden = false, xAxisProps = {}, yAxisProps = {}, xAxisLabel, yAxisLabel, onCrosshairMove, curveType = "natural", gradient = "area", strokeWidth = 2, strokeDasharray, customDot, referenceLines = [], xAxisLabelProps, yAxisLabelProps, withoutReferenceLine, withoutTooltip, legend, withoutActiveDot, }) {
    const { series, xAxisKey } = getConfigWithDefaults(config);
    const { themeProps: theme } = useTheme();
    const chartId = useId();
    const primarySeries = pickPrimarySeries(config);
    const primarySeriesKey = primarySeries?.key;
    const [activePointValue, setActivePointValue] = useState(null);
    const onMouseMove = (chartState) => {
        if (withoutActiveDot && withoutTooltip)
            return;
        const index = Number(chartState?.activeTooltipIndex);
        if (Number.isNaN(index)) {
            return onCrosshairMove?.(null);
        }
        const activeData = data[index];
        if (isString(primarySeriesKey) && isNumber(activeData[primarySeriesKey])) {
            setActivePointValue(activeData[primarySeriesKey]);
            onCrosshairMove?.(activeData);
        }
    };
    const { margin, labelFormatter, tooltipFormatter, valueFormatter, tooltipWrapperStyles, } = getDerivedChartProps(config);
    const isAreaGradientFill = gradient === "area" || gradient === "all";
    const isLineGradientFill = gradient === "line" || gradient === "all";
    return (_jsx(ChartContainer, { config: config, height: height, aspectRatio: aspectRatio, children: _jsxs(AreaChartPrimitive, { accessibilityLayer: true, data: data, onMouseMove: onMouseMove, onMouseLeave: () => {
                setActivePointValue(null);
                onCrosshairMove?.(null);
            }, margin: margin, children: [_jsx(CartesianGrid, { horizontal: !horizontalGridHidden, vertical: !verticalGridHidden, shapeRendering: "crispEdges", horizontalValues: gridHorizontalValues, verticalValues: gridVerticalValues, stroke: theme.text.low, opacity: 0.15, strokeWidth: 1 }), _jsx(XAxis, { dataKey: xAxisKey, tickLine: false, axisLine: false, tickMargin: 8, shapeRendering: "crispEdges", domain: ["dataMin", "dataMax"], style: { fontSize: 12, fill: theme.text.medium }, tickFormatter: labelFormatter, hide: xAxisHidden, ...xAxisProps, label: getAxisLabelProps(xAxisLabel, false, xAxisLabelProps) }), _jsx(Label, {}), _jsx(YAxis, { tickLine: false, axisLine: false, tickMargin: 8, style: { fontSize: 12, fill: theme.text.medium }, allowDataOverflow: true, tickFormatter: valueFormatter, hide: yAxisHidden, ...yAxisProps, label: getAxisLabelProps(yAxisLabel, true, yAxisLabelProps) }), !withoutTooltip && (_jsx(Tooltip, { content: ChartTooltip, labelFormatter: tooltipFormatter, formatter: (value) => {
                        if (valueFormatter && isNumber(value)) {
                            return valueFormatter(value);
                        }
                        return value;
                    }, wrapperStyle: tooltipWrapperStyles, cursor: {
                        shapeRendering: "crispEdges",
                        stroke: theme.text.low,
                        strokeWidth: 1,
                        strokeDasharray: "6 6",
                    } })), !withoutReferenceLine && (_jsx(ReferenceLine, { y: activePointValue ?? 0, stroke: theme.text.low, strokeDasharray: "6 6", opacity: activePointValue ? 1 : 0, shapeRendering: "crispEdges" })), series.map(({ key, color }) => {
                    const colors = getColorSet(color, theme.details.chart);
                    const stopOpacity1 = color?.[2] ?? 1;
                    const stopOpacity2 = color?.[3] ?? (colors.primary === colors.secondary ? 0 : 1);
                    const gradientId = `${chartId}-${key}-gradient`;
                    return (_jsxs(Fragment, { children: [_jsx("defs", { children: _jsxs("linearGradient", { id: gradientId, x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "5%", stopColor: colors.primary, stopOpacity: stopOpacity1 }), _jsx("stop", { offset: "95%", stopColor: colors.secondary, stopOpacity: stopOpacity2 })] }) }), _jsx(Area, { dataKey: key, type: curveType, strokeWidth: strokeWidth, strokeDasharray: strokeDasharray, fill: isAreaGradientFill ? `url(#${gradientId})` : "none", fillOpacity: 0.4, stroke: isLineGradientFill ? `url(#${gradientId})` : colors.primary, dot: customDot, activeDot: withoutActiveDot ? false : { fill: colors.primary, r: 5 }, stackId: "a", animationDuration: 600 })] }, key));
                }), referenceLines.map((props) => (_jsx(ReferenceLine, { shapeRendering: "crispEdges", ...props }, props.x))), legend] }) }));
}
