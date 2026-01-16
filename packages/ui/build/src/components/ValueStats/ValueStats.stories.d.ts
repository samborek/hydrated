import type { StoryObj } from "@storybook/react";
import { ValueStats } from "./ValueStats";
type Story = StoryObj<typeof ValueStats>;
declare const _default: {
    component: import("react").FC<import("react").HTMLAttributes<HTMLDivElement> & {
        readonly font?: import("./ValueStats.styled").ValueStatsFont;
        readonly wrap?: import("@theme-ui/css").ResponsiveStyleValue<boolean>;
        readonly size?: import("./ValueStats.styled").ValueStatsSize;
        readonly label?: string;
        readonly customLabel?: import("react").ReactNode;
        readonly value?: string;
        readonly customValue?: import("react").ReactNode;
        readonly bottomLabel?: string;
        readonly customBottomLabel?: import("react").ReactNode;
        readonly isLoading?: boolean;
        readonly className?: string;
    }>;
};
export default _default;
export declare const Small: Story;
export declare const Medium: Story;
export declare const Large: Story;
export declare const BottomLabel: Story;
export declare const SecondaryFont: Story;
