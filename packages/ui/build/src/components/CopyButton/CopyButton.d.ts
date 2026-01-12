type RenderProps = {
    copied: boolean;
};
export type CopyButtonProps = {
    text: string;
    delay?: number;
    defaultIcon?: React.ComponentType;
    copiedIcon?: React.ComponentType;
    iconSize?: number;
    children?: (props: RenderProps) => React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "disabled" | "type" | "children">;
export declare const CopyButton: React.FC<CopyButtonProps>;
export {};
