import type { StoryObj } from "@storybook/react";
import { JsonView } from "./JsonView";
type Story = StoryObj<typeof JsonView>;
declare const _default: {
    component: import("react").FC<import("react18-json-view").JsonViewProps & {
        className?: string;
        fs?: import("@theme-ui/css").ResponsiveStyleValue<number>;
    } & {
        ref?: import("react").Ref<HTMLDivElement>;
    }>;
};
export default _default;
export declare const Default: Story;
export declare const CustomFontSize: Story;
