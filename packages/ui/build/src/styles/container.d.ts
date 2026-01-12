import { SerializedStyles } from "@emotion/react";
import { ScreenBreakpoint } from "./media";
export type ContainerQueryType = "size" | "inline-size" | "block-size";
export type ContainerQueryCondition = {
    type: ContainerQueryType;
    value: string;
};
export type ContainerQueryConfig = {
    name?: string;
    conditions: ContainerQueryCondition[];
};
export declare function containerQuery(config: ContainerQueryConfig, styles: SerializedStyles | string): SerializedStyles;
export declare function containerSize(size: ScreenBreakpoint, styles: SerializedStyles | string, type?: ContainerQueryType): SerializedStyles;
