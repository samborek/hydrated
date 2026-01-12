import { ThemeUICSSProperties } from "@theme-ui/core";
import { FC, Ref } from "react";
import { BoxProps } from "@/components/Box";
export type FlexOwnProps = {
    inline?: boolean;
    wrap?: boolean;
    gap?: ThemeUICSSProperties["gap"];
    direction?: ThemeUICSSProperties["flexDirection"];
    align?: ThemeUICSSProperties["alignItems"];
    justify?: ThemeUICSSProperties["justifyContent"];
};
export type FlexProps = FlexOwnProps & BoxProps;
export declare const Flex: FC<FlexProps & {
    ref?: Ref<HTMLElement>;
}>;
