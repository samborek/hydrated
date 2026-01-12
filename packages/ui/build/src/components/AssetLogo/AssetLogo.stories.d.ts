import type { StoryObj } from "@storybook/react";
import React from "react";
import { AssetLogo } from "./AssetLogo";
type Story = StoryObj<typeof AssetLogo>;
declare const _default: {
    component: ({ src, size, alt, chainSrc, badge, badgeTooltip, isLoading, decoration, className, }: import("./AssetLogo").AssetLogoProps) => React.JSX.Element;
};
export default _default;
export declare const Default: Story;
export declare const WithChain: Story;
export declare const WithMultipleAssets: Story;
export declare const WithAtokenDecoration: Story;
export declare const WithYellowBadge: Story;
export declare const WithRedBadge: Story;
export declare const Placeholder: Story;
