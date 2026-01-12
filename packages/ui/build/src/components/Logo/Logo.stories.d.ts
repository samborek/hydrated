import type { StoryObj } from "@storybook/react";
import React from "react";
import { Logo } from "./Logo";
type Story = StoryObj<typeof Logo>;
declare const _default: {
    component: React.FC<import("./Logo").LogoProps>;
};
export default _default;
export declare const Default: Story;
export declare const WithPlaceholder: Story;
