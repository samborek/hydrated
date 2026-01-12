import { FC, Ref } from "react";
import { BoxProps } from "@/components/Box";
export type PaperProps = BoxProps & {
    variant?: "plain" | "bordered";
};
export declare const Paper: FC<PaperProps & {
    ref?: Ref<HTMLElement>;
}>;
