import { hexToRgba } from "@galacticcouncil/utils";
import { BaselineSeries, CandlestickSeries, HistogramSeries, } from "lightweight-charts";
import { isNumber, last } from "remeda";
export const parseTradingViewTime = (time) => {
    if (typeof time === "number") {
        return time * 1000;
    }
    if (typeof time === "string") {
        return new Date(time).getTime();
    }
    return 0;
};
export const getCrosshairValue = (crosshair) => {
    if (!crosshair)
        return;
    if (crosshair.type === "Candlestick")
        return crosshair.data.close;
    if (crosshair.type === "Baseline")
        return crosshair.data.value;
};
export const toUTCTimestamp = (timestamp) => {
    return Math.floor(timestamp / 1000);
};
const getCandlestickSeries = (chart, options) => {
    return chart.addSeries(CandlestickSeries, {
        upColor: options.upColor,
        downColor: options.downColor,
        wickUpColor: options.upColor,
        wickDownColor: options.downColor,
        borderVisible: false,
        priceLineVisible: false,
    });
};
const getBaselineSeries = (chart, color, baseline) => {
    return chart.addSeries(BaselineSeries, {
        topLineColor: color.lineColor,
        topFillColor1: hexToRgba(color.lineColor, 0.5),
        topFillColor2: hexToRgba(color.lineColor, 0),
        lineWidth: 2,
        priceLineVisible: false,
        ...baseline,
    });
};
const getVolumeSeries = (chart, options) => {
    const series = chart.addSeries(HistogramSeries, {
        visible: true,
        color: options.volumeBarColor,
        lastValueVisible: false,
        priceLineVisible: false,
        priceFormat: {
            type: "volume",
        },
        priceScaleId: "",
    });
    series.priceScale().applyOptions({
        scaleMargins: {
            top: 0.85,
            bottom: 0,
        },
    });
    return series;
};
const getMainSeries = (chart, type, color, baseline) => {
    switch (type) {
        case "Candlestick":
            return getCandlestickSeries(chart, color);
        case "Baseline":
            return getBaselineSeries(chart, color, baseline);
        default:
            throw new Error(`Unknown series type: ${type}`);
    }
};
const getMainSeriesData = (type, data) => {
    if (type === "Candlestick")
        return data;
    return data.map((item) => ({ time: item.time, value: item.close }));
};
const getVolumeData = (data) => {
    return data.map((item) => ({
        time: item.time,
        value: item.volume ?? 0,
    }));
};
export const renderSeries = (chart, type, data = [], color, baseline = {}) => {
    const series = getMainSeries(chart, type, color, baseline);
    const seriesData = getMainSeriesData(type, data);
    series.setData(seriesData);
    const sample = last(data);
    const hasVolume = isNumber(sample?.volume);
    if (hasVolume) {
        const volumeSeries = getVolumeSeries(chart, color);
        const volumeData = getVolumeData(data);
        volumeSeries.setData(volumeData);
        return [series, volumeSeries];
    }
    return [series];
};
export const subscribeCrosshairMove = (chart, [series, volumeSeries], chartContainerElement, crosshairElement, priceIndicatorElement, onUpdate) => {
    if (!chart || !series || !crosshairElement)
        return;
    crosshairElement.style.top = "10px";
    if (priceIndicatorElement) {
        priceIndicatorElement.style.left = "0px";
        priceIndicatorElement.style.opacity = "0";
    }
    chart.subscribeCrosshairMove((param) => {
        if (!param || !param.time || param.point === undefined) {
            crosshairElement.style.opacity = "0";
            if (priceIndicatorElement) {
                priceIndicatorElement.style.opacity = "0";
            }
            onUpdate(null);
            return;
        }
        const dataPoint = param.seriesData.get(series);
        if (!dataPoint) {
            crosshairElement.style.opacity = "0";
            if (priceIndicatorElement) {
                priceIndicatorElement.style.opacity = "0";
            }
            onUpdate(null);
            return;
        }
        const volumeDataPoint = volumeSeries &&
            param.seriesData.get(volumeSeries);
        const data = series.seriesType() === "Candlestick"
            ? { type: "Candlestick", data: dataPoint }
            : {
                type: "Baseline",
                data: {
                    ...dataPoint,
                    volume: volumeDataPoint?.value,
                },
            };
        const chartRect = chartContainerElement.getBoundingClientRect();
        const tooltipWidth = crosshairElement.offsetWidth;
        const price = getCrosshairValue(data);
        const priceY = price ? series.priceToCoordinate(price) : null;
        const priceFormatted = price ? series.priceFormatter().format(price) : "";
        const priceIndicatorHeight = priceIndicatorElement?.offsetHeight ?? 0;
        let left = param.point.x - tooltipWidth / 2;
        if (left < 10) {
            left = param.point.x + 10;
        }
        else if (left + tooltipWidth > chartRect.width - 10) {
            left = param.point.x - tooltipWidth - 10;
        }
        crosshairElement.style.left = `${left}px`;
        crosshairElement.style.opacity = "1";
        if (priceIndicatorElement) {
            if (priceY) {
                const top = priceY - priceIndicatorHeight / 2;
                priceIndicatorElement.style.opacity = "1";
                priceIndicatorElement.style.top = `${top}px`;
                priceIndicatorElement.innerHTML = priceFormatted;
            }
            else {
                priceIndicatorElement.style.opacity = "0";
            }
        }
        onUpdate(data);
    });
};
