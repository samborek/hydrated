import { ImgHTMLAttributes } from "react";
export type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "loading"> & {
    lazy?: boolean;
    placeholder?: React.ReactNode;
};
export declare const Image: ({ src, placeholder, onError, lazy, ...props }: ImageProps) => string | number | bigint | true | import("react").JSX.Element | Iterable<import("react").ReactNode> | Promise<string | number | bigint | boolean | import("react").ReactPortal | import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | Iterable<import("react").ReactNode> | null | undefined>;
