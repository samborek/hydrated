import { LogoProps, LogoSize } from "@/components";
export type AssetLogoBadge = "red" | "yellow";
export type AssetLogoDecoration = "none" | "atoken";
export type AssetLogoProps = LogoProps & {
    chainSrc?: string;
    badge?: AssetLogoBadge;
    badgeTooltip?: string;
    decoration?: AssetLogoDecoration;
    isLoading?: boolean;
};
export declare const AssetLogo: ({ src, size, alt, chainSrc, badge, badgeTooltip, isLoading, decoration, className, }: AssetLogoProps) => import("react").JSX.Element;
type MultipleAssetLogoWrapperProps = {
    size?: LogoSize;
    children: React.ReactNode;
    decoration?: AssetLogoDecoration;
};
export declare const MultipleAssetLogoWrapper: ({ size, children, decoration, }: MultipleAssetLogoWrapperProps) => import("react").JSX.Element;
export {};
