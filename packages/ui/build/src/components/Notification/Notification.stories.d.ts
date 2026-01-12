import { StoryObj } from "@storybook/react";
import { Notification } from "./Notification";
type Story = StoryObj<typeof Notification>;
declare const _default: {
    component: ({ content, className, variant, autoClose, autoCloseTimeSC, onClose, dateString, link, hint, }: {
        variant: import("./Notification").ToastVariant;
        content: string;
        className?: string;
        onClose?: () => void;
        autoClose?: boolean;
        autoCloseTimeSC?: number;
        dateString?: string;
        link?: string;
        hint?: string;
    }) => import("react").JSX.Element;
};
export default _default;
export declare const Success: Story;
export declare const Pending: Story;
export declare const Error: Story;
export declare const Warning: Story;
export declare const Submitted: Story;
export declare const Unknown: Story;
