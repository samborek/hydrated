import { FC, ReactNode } from "react";
import { AlertVariant } from "@/components/Alert/Alert.styled";
export type AlertProps = {
    readonly variant?: AlertVariant;
    readonly title?: string;
    readonly description: ReactNode;
    readonly action?: ReactNode;
    readonly className?: string;
    readonly displayIcon?: boolean;
};
export declare const Alert: FC<AlertProps>;
