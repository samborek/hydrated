import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { createContext, useContext, useId } from "react";
import { ResponsiveContainer } from "recharts";
import { isArray, isNonNull, isObjectType, isString } from "remeda";
import { SChartContainer } from "@/components/Chart/ChartContainer.styled";
import { getConfigWithDefaults } from "@/components/Chart/utils";
const ChartContext = createContext(null);
export function useChart() {
    const context = useContext(ChartContext);
    if (!context) {
        throw new Error("useChart must be used within a <ChartContainer />");
    }
    const config = getConfigWithDefaults(context.config);
    return { ...context, config };
}
const isConfigValid = (config) => {
    return (isNonNull(config) &&
        isObjectType(config) &&
        isString(config.xAxisKey) &&
        isArray(config.series));
};
export function ChartContainer({ id, children, config, height = "100%", aspectRatio, ...props }) {
    const uniqueId = useId();
    const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;
    if (!isConfigValid(config)) {
        throw new Error(`Invalid chart ${chartId} configuration`);
    }
    const sizeProps = aspectRatio ? { aspectRatio } : { height };
    return (_jsx(ChartContext.Provider, { value: { config }, children: _jsx(SChartContainer, { "data-chart": chartId, sx: sizeProps, ...props, children: _jsx(ResponsiveContainer, { children: children }) }) }));
}
