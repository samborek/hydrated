import { ReactNode } from "react";
import { PointsSize } from "@/components/Points/Points.styled";
type Props = {
    readonly size?: PointsSize;
    readonly number: number;
    readonly title: ReactNode;
    readonly description: ReactNode;
    readonly className?: string;
};
export declare const Points: ({ size, number, title, description, className, }: Props) => import("react").JSX.Element;
export {};
