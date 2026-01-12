import type { StoryObj } from "@storybook/react";
import { NavigationMenu } from "./NavigationMenu";
type Story = StoryObj<typeof NavigationMenu>;
declare const _default: {
    component: import("react").FC<import("@radix-ui/react-navigation-menu").NavigationMenuProps & import("react").RefAttributes<HTMLElement>>;
};
export default _default;
export type NavigationItem = {
    key: string;
    children?: NavigationItem[];
};
export declare const NAVIGATION: NavigationItem[];
export declare const Default: Story;
