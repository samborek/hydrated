import { ColorType, TickMarkType, } from "lightweight-charts";
import { monthFormatter, timeFormatter, yearFormatter, } from "@/components/Chart/utils";
import { parseTradingViewTime } from "@/components/TradingViewChart/utils";
export const layout = (theme) => ({
    background: { type: ColorType.Solid, color: "transparent" },
    textColor: theme.text.low,
    fontSize: 12,
    attributionLogo: false,
});
export const rightPriceScale = {
    visible: false,
};
export const leftPriceScale = {
    scaleMargins: {
        top: 0.2,
        bottom: 0.2,
    },
    visible: false,
    borderVisible: false,
    entireTextOnly: true,
};
export const timeScale = {
    visible: true,
    fixLeftEdge: true,
    fixRightEdge: true,
    borderVisible: false,
    timeVisible: true,
    secondsVisible: false,
    tickMarkFormatter: (time, tickMarkType) => {
        const timestamp = parseTradingViewTime(time);
        if (!timestamp)
            return "";
        switch (tickMarkType) {
            case TickMarkType.Year:
                return yearFormatter.format(timestamp);
            case TickMarkType.Month:
            case TickMarkType.DayOfMonth:
                return monthFormatter.format(timestamp);
            default:
                return timeFormatter.format(timestamp);
        }
    },
};
export const crosshair = (theme) => ({
    mode: 1,
    horzLine: {
        visible: true,
        labelVisible: false,
        color: theme.text.low,
    },
    vertLine: {
        visible: true,
        labelVisible: false,
        color: theme.text.low,
    },
});
export const grid = {
    horzLines: {
        visible: false,
    },
    vertLines: {
        visible: false,
    },
};
