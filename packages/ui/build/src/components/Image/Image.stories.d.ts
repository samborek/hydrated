import type { StoryObj } from "@storybook/react";
import React from "react";
import { Image } from "./Image";
type Story = StoryObj<typeof Image>;
declare const _default: {
    component: ({ src, placeholder, onError, lazy, ...props }: import("./Image").ImageProps) => string | number | bigint | true | React.JSX.Element | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined>;
};
export default _default;
export declare const Default: Story;
export declare const WithPlaceholder: Story;
