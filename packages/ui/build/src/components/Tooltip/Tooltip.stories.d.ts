import type { StoryObj } from "@storybook/react";
import React from "react";
import { Tooltip } from "./Tooltip";
type Story = StoryObj<typeof Tooltip>;
declare const _default: {
    component: ({ text, children, side, align, sideOffset, alignOffset, asChild, preventDefault, iconColor, }: import("./Tooltip").InfoTooltipProps) => React.JSX.Element;
};
export default _default;
export declare const Default: Story;
