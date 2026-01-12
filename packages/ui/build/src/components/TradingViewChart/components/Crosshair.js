import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { ChartCrosshair } from "@/components";
import { dateFormatter, timeFormatter } from "@/components/Chart/utils";
import { parseTradingViewTime, } from "@/components/TradingViewChart/utils";
export const Crosshair = ({ data, ref }) => {
    const timestamp = data?.time ? parseTradingViewTime(data.time) : null;
    return (_jsx("div", { ref: ref, sx: { display: "block", position: "absolute", zIndex: 2 }, children: timestamp && (_jsx(ChartCrosshair, { date: dateFormatter.format(timestamp), time: timeFormatter.format(timestamp) })) }));
};
