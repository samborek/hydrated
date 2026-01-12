import { StoryObj } from "@storybook/react";
import { AccountInput } from "./AccountInput";
type Story = StoryObj<typeof AccountInput>;
declare const _default: {
    component: import("react").FC<import("@/components").AccountInputProps>;
    title: string;
};
export default _default;
export declare const Default: Story;
export declare const WithValue: Story;
export declare const WithError: Story;
