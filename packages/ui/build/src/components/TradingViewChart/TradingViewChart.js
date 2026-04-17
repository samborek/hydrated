import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { hexToRgba } from "@galacticcouncil/utils";
import { createChart, LineType } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import { Box } from "../Box";
import { Crosshair } from "./components/Crosshair";
import { PriceIndicator } from "./components/PriceIndicator";
import { crosshair, grid, layout, leftPriceScale, rightPriceScale, timeScale, } from "./config";
import { renderSeries, subscribeCrosshairMove, } from "./utils";
import { useTheme } from "@/theme";
export const TradingViewChart = ({ data, type = "Baseline", height = 400, hidePriceIndicator, preventTouchDrag, onCrosshairMove, }) => {
    const chartContainerRef = useRef(null);
    const crosshairRef = useRef(null);
    const priceIndicatorRef = useRef(null);
    const onCrosshairMoveRef = useRef(onCrosshairMove);
    useEffect(() => {
        onCrosshairMoveRef.current = onCrosshairMove;
    }, [onCrosshairMove]);
    const [crosshairData, setCrosshairData] = useState(null);
    const { themeProps } = useTheme();
    useEffect(() => {
        if (!chartContainerRef.current)
            return;
        const chart = createChart(chartContainerRef.current, {
            autoSize: true,
            height,
            layout: layout(themeProps),
            rightPriceScale,
            leftPriceScale,
            grid,
            timeScale,
            crosshair: crosshair(themeProps),
            handleScroll: preventTouchDrag
                ? {
                    horzTouchDrag: true,
                    vertTouchDrag: false,
                }
                : undefined,
            handleScale: preventTouchDrag
                ? {
                    axisPressedMouseMove: true,
                    mouseWheel: true,
                    pinch: true,
                }
                : undefined,
        });
        const [series, volumeSeries] = renderSeries(chart, type, data, {
            upColor: themeProps.details.values.positive,
            downColor: themeProps.details.values.negative,
            lineColor: themeProps.details.chart,
            volumeBarColor: hexToRgba(themeProps.details.chart, 0.3),
        }, {
            lineType: LineType.Curved,
        });
        chart.timeScale().fitContent();
        if (crosshairRef.current &&
            (hidePriceIndicator || !!priceIndicatorRef.current)) {
            subscribeCrosshairMove(chart, [series, volumeSeries], chartContainerRef.current, crosshairRef.current, priceIndicatorRef.current, (data) => {
                setCrosshairData(data);
                onCrosshairMoveRef.current?.((data?.data ?? null));
            });
        }
        return () => {
            chart.remove();
        };
    }, [data, height, themeProps, type, hidePriceIndicator, preventTouchDrag]);
    return (_jsxs(Box, { sx: { position: "relative", touchAction: preventTouchDrag ? "pan-y pinch-zoom" : undefined }, children: [_jsx("div", { ref: chartContainerRef }), _jsx(Crosshair, { ref: crosshairRef, ...crosshairData }), !hidePriceIndicator && _jsx(PriceIndicator, { ref: priceIndicatorRef })] }));
};
