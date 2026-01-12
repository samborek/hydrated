import { StoryObj } from "@storybook/react";
import { Box } from "./Box";
type Story = StoryObj<typeof Box>;
declare const _default: {
    component: import("react").FC<import("./Box").BoxProps>;
};
export default _default;
export declare const Default: Story;
export declare const WithBorderRadius: Story;
export declare const WithBackground: Story;
export declare const WithColor: Story;
export declare const WithPadding: Story;
export declare const WithMargin: Story;
export declare const WithSize: Story;
export declare const Responsive: Story;
