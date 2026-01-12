import { StoryObj } from "@storybook/react";
import { Toggle } from "./Toggle";
type Story = StoryObj<typeof Toggle>;
declare const _default: {
    component: import("react").FC<import("@radix-ui/react-switch").SwitchProps & {
        size?: "large" | "medium";
        onCheckedChange: (v: boolean) => void;
    } & {
        ref?: import("react").Ref<HTMLButtonElement>;
    }>;
};
export default _default;
export declare const Default: Story;
export declare const Large: Story;
export declare const Active: Story;
export declare const Disabled: Story;
export declare const DisabledActive: Story;
