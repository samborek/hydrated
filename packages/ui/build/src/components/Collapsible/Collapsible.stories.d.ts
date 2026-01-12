import { StoryFn } from "@storybook/react";
import { Collapsible } from "./Collapsible";
declare const _default: {
    component: import("react").FC<import("@radix-ui/react-collapsible").CollapsibleProps & import("react").RefAttributes<HTMLDivElement> & ({
        trigger: React.ReactNode;
        label?: never;
        actionLabel?: never;
        actionLabelWhenOpen?: never;
    } | {
        trigger?: never;
        label: string | React.ReactNode;
        actionLabel: string;
        actionLabelWhenOpen?: string;
    })>;
};
export default _default;
type Story = StoryFn<typeof Collapsible>;
export declare const Default: Story;
export declare const InitiallyOpen: Story;
export declare const CustomTrigger: Story;
