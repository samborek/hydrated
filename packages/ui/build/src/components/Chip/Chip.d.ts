import { FC } from "react";
import { BoxProps } from "@/components";
import { SChipProps } from "@/components/Chip/Chip.styled";
export type ChipProps = BoxProps & SChipProps & {
    ref?: React.Ref<HTMLDivElement>;
};
export declare const Chip: FC<ChipProps>;
