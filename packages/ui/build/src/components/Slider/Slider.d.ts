import { FC } from "react";
export type SliderProps = {
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step: number;
    disabled?: boolean;
    dashCount?: number;
};
export declare const Slider: FC<SliderProps>;
