import { TextProps } from "@/components";
export type LabelProps = Omit<TextProps, "as"> & Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "color">;
export declare const Label: React.FC<LabelProps>;
