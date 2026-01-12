type IsolationModeWarningProps = {
    asset?: string;
    severity?: "warning" | "error" | "info";
    className?: string;
};
export declare const IsolationModeWarning: ({ asset, severity, className, }: IsolationModeWarningProps) => import("react").JSX.Element;
export {};
