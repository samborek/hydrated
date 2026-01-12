import "react18-json-view/src/style.css";
import { ResponsiveStyleValue } from "@theme-ui/css";
import React, { FC, Ref } from "react";
import { type JsonViewProps as ReactJsonViewProps } from "react18-json-view";
export type JsonViewProps = ReactJsonViewProps & {
    className?: string;
    fs?: ResponsiveStyleValue<number>;
};
export declare const JsonView: FC<JsonViewProps & {
    ref?: Ref<HTMLDivElement>;
}>;
export declare const JsonViewFallback: React.FC<{
    src: ReactJsonViewProps["src"];
}>;
