import { ComponentType, FC } from "react";
type Props = {
    readonly icon: ComponentType;
    readonly name: string;
    readonly className?: string;
    readonly onClick?: () => void;
    readonly variant?: "desktop" | "mobile";
    readonly isActive?: boolean;
};
export declare const Chain: FC<Props>;
export {};
