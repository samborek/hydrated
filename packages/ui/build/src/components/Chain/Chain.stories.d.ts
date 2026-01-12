import { StoryFn } from "@storybook/react";
declare const _default: {
    component: import("react").FC<{
        readonly icon: import("react").ComponentType;
        readonly name: string;
        readonly className?: string;
        readonly onClick?: () => void;
        readonly variant?: "desktop" | "mobile";
        readonly isActive?: boolean;
    }>;
};
export default _default;
export declare const Desktop: StoryFn;
export declare const Mobile: StoryFn;
