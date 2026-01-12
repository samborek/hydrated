import { FC, Ref } from "react";
import { CrosshairCallbackData } from "@/components/TradingViewChart/utils";
export declare const Crosshair: FC<Partial<NonNullable<CrosshairCallbackData>> & {
    ref?: Ref<HTMLDivElement>;
}>;
