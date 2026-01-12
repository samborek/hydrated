import type { StoryObj } from "@storybook/react";
import { Summary } from "./Summary";
type Story = StoryObj<typeof Summary>;
declare const _default: {
    component: ({ rows, children, separated, ...props }: Omit<import("@/components").StackProps, "children"> & ({
        readonly rows: ReadonlyArray<import("@/components").SummaryRowProps>;
        readonly children?: never;
    } | {
        readonly children: import("react").ReactNode;
        readonly rows?: never;
    })) => import("react").JSX.Element;
};
export default _default;
export declare const Default: Story;
