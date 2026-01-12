import { StoryObj } from "@storybook/react";
import React from "react";
import { TextButton } from "./TextButton";
type Story = StoryObj<typeof TextButton>;
declare const _default: {
    component: React.FC<Omit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & import("./TextButton.styled").CustomTextButtonProps & {
        ref?: React.Ref<HTMLButtonElement>;
    }>;
};
export default _default;
export declare const Default: Story;
export declare const Underline: Story;
export declare const UnderlineInternal: Story;
export declare const UnderlineExternal: Story;
