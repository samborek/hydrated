import { ImageProps } from "@/components/Image";
export type LogoSize = "large" | "medium" | "small" | "extra-small";
export type LogoProps = ImageProps & {
    size?: LogoSize;
};
export declare const Logo: React.FC<LogoProps>;
