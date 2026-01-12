import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Bar, BarChart as BarChartPrimitive, CartesianGrid, Tooltip, XAxis, YAxis, } from "recharts";
import { isNumber } from "remeda";
import { ChartContainer } from "@/components/Chart";
import { ChartTooltip } from "@/components/Chart/ChartTooltip";
import { getAxisLabelProps, getBarSeriesBorderRadius, getColorSet, getConfigWithDefaults, getDerivedChartProps, } from "@/components/Chart/utils";
import { useTheme } from "@/theme";
export function BarChart({ config, data, height, aspectRatio, horizontalGridHidden = true, verticalGridHidden = false, xAxisHidden = false, yAxisHidden = false, xAxisProps = {}, yAxisProps = {}, xAxisLabel, yAxisLabel, onCrosshairMove, layout, barSize, barGap, barCategoryGap, stacked = false, }) {
    const { series, xAxisKey } = getConfigWithDefaults(config);
    const { themeProps: theme } = useTheme();
    const { margin, labelFormatter, valueFormatter, tooltipWrapperStyles } = getDerivedChartProps(config);
    const isVerticalLayout = layout === "vertical";
    return (_jsx(ChartContainer, { config: config, height: height, aspectRatio: aspectRatio, children: _jsxs(BarChartPrimitive, { accessibilityLayer: true, data: data, barSize: barSize, barGap: barGap, barCategoryGap: barCategoryGap, layout: layout, margin: margin, onMouseMove: (chartState) => {
                if (chartState &&
                    chartState.activeTooltipIndex !== undefined &&
                    chartState.activeTooltipIndex !== null &&
                    series.length > 0) {
                    const activeData = data[chartState.activeTooltipIndex];
                    onCrosshairMove?.(activeData);
                }
            }, onMouseLeave: () => onCrosshairMove?.(null), children: [_jsx(CartesianGrid, { horizontal: !horizontalGridHidden, vertical: !verticalGridHidden, shapeRendering: "crispEdges", stroke: theme.text.low, opacity: 0.15, strokeWidth: 1 }), _jsx(XAxis, { dataKey: isVerticalLayout ? undefined : xAxisKey, type: isVerticalLayout ? "number" : "category", tickLine: false, axisLine: false, tickMargin: 8, shapeRendering: "crispEdges", tickFormatter: isVerticalLayout ? valueFormatter : labelFormatter, hide: xAxisHidden, ...xAxisProps, label: getAxisLabelProps(isVerticalLayout ? yAxisLabel : xAxisLabel, false) }), _jsx(YAxis, { dataKey: isVerticalLayout ? xAxisKey : undefined, type: isVerticalLayout ? "category" : "number", tickLine: false, axisLine: false, tickMargin: 8, tickFormatter: isVerticalLayout ? labelFormatter : valueFormatter, hide: yAxisHidden, ...yAxisProps, label: getAxisLabelProps(isVerticalLayout ? xAxisLabel : yAxisLabel, true) }), _jsx(Tooltip, { content: ChartTooltip, labelFormatter: labelFormatter, formatter: (value) => {
                        if (valueFormatter && isNumber(value)) {
                            return valueFormatter(value);
                        }
                        return value;
                    }, wrapperStyle: tooltipWrapperStyles, cursor: {
                        fill: theme.text.low,
                        fillOpacity: 0.1,
                        strokeWidth: 0,
                        shapeRendering: "crispEdges",
                    } }), series.map(({ key, color }, index) => (_jsx(Bar, { dataKey: key, fill: getColorSet(color, theme.details.chart).primary, radius: getBarSeriesBorderRadius(index, series.length - 1, stacked, isVerticalLayout), shapeRendering: "geometricPrecision", animationDuration: 600, stackId: stacked ? "stack" : key }, key)))] }) }));
}
