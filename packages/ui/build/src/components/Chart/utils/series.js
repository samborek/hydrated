import { isValidElement } from "react";
import { first, isArray, isNumber, isObjectType, isString } from "remeda";
import { dateFormatter, numberFormatter, } from "@/components/Chart/utils/formatters";
export const pickPrimarySeries = (config) => {
    return first(config.series);
};
export const getColorSet = (color, defaultColor = "#000") => {
    if (isArray(color)) {
        return {
            primary: color[0] || defaultColor,
            secondary: color[1] || defaultColor,
        };
    }
    if (isString(color))
        return {
            primary: color,
            secondary: color,
        };
    return {
        primary: defaultColor,
        secondary: defaultColor,
    };
};
export const getDefaultFormatterByType = (type) => {
    if (!type)
        return undefined;
    switch (type) {
        case "time":
            return dateFormatter.format;
        case "number":
            return numberFormatter.format;
        default:
            return undefined;
    }
};
export const getConfigWithDefaults = (config) => {
    return {
        ...config,
        xAxisType: config.xAxisType || "category",
        yAxisType: config.yAxisType || "number",
        tooltipType: config.tooltipType || "legend",
    };
};
export const getDerivedChartProps = (config) => {
    const { yAxisFormatter, yAxisType, xAxisFormatter, tooltipFormatter, xAxisType, tooltipType, } = getConfigWithDefaults(config);
    const labelFormatter = xAxisFormatter || getDefaultFormatterByType(xAxisType);
    const valueFormatter = yAxisFormatter || getDefaultFormatterByType(yAxisType);
    const marginTop = tooltipType === "timeTop" ? 40 : 0;
    const marginBot = tooltipType === "timeBottom" ? 40 : 0;
    const margin = { top: marginTop, bottom: marginBot };
    const isTimeTooltip = tooltipType === "timeTop" || tooltipType === "timeBottom";
    const tooltipWrapperStyles = isTimeTooltip
        ? { position: "static" }
        : undefined;
    return {
        margin,
        labelFormatter,
        tooltipFormatter: tooltipFormatter || labelFormatter,
        valueFormatter,
        tooltipWrapperStyles,
    };
};
export const getBarSeriesBorderRadius = (index, total, isStacked = false, isVerticalLayout = false) => {
    if (!isStacked)
        return [4, 4, 4, 4];
    const isFirst = index === total;
    const isLast = index === 0;
    if (isFirst && isLast)
        return [4, 4, 4, 4];
    if (isVerticalLayout) {
        if (isFirst)
            return [0, 4, 4, 0];
        if (isLast)
            return [4, 0, 0, 4];
        return [0, 0, 0, 0];
    }
    else {
        if (isFirst)
            return [4, 4, 0, 0];
        if (isLast)
            return [0, 0, 4, 4];
        return [0, 0, 0, 0];
    }
};
export const getAxisLabelProps = (config, isVerticalLayout, labelProps) => {
    if (!config)
        return;
    const defaultProps = {
        position: isVerticalLayout ? "insideLeft" : "insideRight",
        angle: isVerticalLayout ? -90 : 0,
        dy: isVerticalLayout ? 35 : 3,
        dx: isVerticalLayout ? 35 : 0,
        fontSize: 12,
        ...labelProps,
    };
    if (isString(config) || isNumber(config)) {
        return {
            value: config,
            ...defaultProps,
        };
    }
    if (isObjectType(config)) {
        return {
            ...defaultProps,
            ...config,
        };
    }
    if (isValidElement(config)) {
        return config;
    }
};
