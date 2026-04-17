import { FC } from "react";
import { type BoxProps } from "../Box";
import { type SChipProps } from "./Chip.styled";
export type ChipProps = BoxProps & SChipProps & {
    ref?: React.Ref<HTMLDivElement>;
};
export declare const Chip: FC<ChipProps>;
