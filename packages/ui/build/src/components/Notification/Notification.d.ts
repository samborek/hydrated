export declare const DEFAULT_AUTO_CLOSE_TIME = 3000;
export type ToastVariant = "pending" | "submitted" | "success" | "error" | "unknown" | "warning";
type CustomToastProps = {
    variant: ToastVariant;
    content: string;
    className?: string;
    onClose?: () => void;
    autoClose?: boolean;
    autoCloseTimeSC?: number;
    dateString?: string;
    link?: string;
    hint?: string;
};
export declare const Notification: ({ content, className, variant, autoClose, autoCloseTimeSC, onClose, dateString, link, hint, }: CustomToastProps) => import("react").JSX.Element;
export {};
