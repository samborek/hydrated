import { StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";
type Story = StoryObj<typeof Checkbox>;
declare const _default: {
    component: import("react").FC<import("./Checkbox.styled").TCheckbox>;
};
export default _default;
export declare const Default: Story;
export declare const Small: Story;
export declare const Large: Story;
export declare const Disabled: Story;
export declare const DisabledActive: Story;
