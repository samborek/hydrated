import type { StoryObj } from "@storybook/react";
import { Table } from "./Table";
type Story = StoryObj<typeof Table>;
declare const _default: {
    component: import("@emotion/styled").StyledComponent<{
        theme?: import("@emotion/react").Theme;
        as?: React.ElementType;
    } & import("./Table.styled").TableProps, import("react").DetailedHTMLProps<import("react").TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>, {}>;
};
export default _default;
export declare const Default: Story;
export declare const SmallSize: Story;
export declare const MediumSize: Story;
export declare const LargeSize: Story;
export declare const Borderless: Story;
