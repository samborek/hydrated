import React from "react";
import { BoxProps } from "@/components/Box";
import { ContainerQueryType } from "@/styles/container";
export type ResponsiveScopeProps = Omit<BoxProps, "css"> & {
    name?: string;
    type?: ContainerQueryType;
};
export declare const ResponsiveScope: React.FC<ResponsiveScopeProps>;
