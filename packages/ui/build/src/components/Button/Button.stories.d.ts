import type { StoryObj } from "@storybook/react";
import { Button, LoadingButton } from "./Button";
type Story = StoryObj<typeof Button>;
declare const _default: {
    component: import("react").FC<import("@/components").ButtonProps>;
};
export default _default;
export declare const Default: Story;
export declare const Disabled: Story;
export declare const Primary: Story;
export declare const Secondary: Story;
export declare const Tertiary: Story;
export declare const Danger: Story;
export declare const Emphasis: Story;
export declare const Accent: Story;
export declare const Muted: Story;
export declare const Transparent: Story;
export declare const WithSpinner: StoryObj<typeof LoadingButton>;
