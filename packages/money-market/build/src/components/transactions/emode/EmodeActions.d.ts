import { EmodeCategory } from "@/helpers/types";
export type EmodeActionsProps = {
    blocked: boolean;
    selectedEmode: number;
    activeEmode: number;
    eModes: Record<number, EmodeCategory>;
};
export declare const EmodeActions: ({ blocked, selectedEmode, activeEmode, eModes, }: EmodeActionsProps) => import("react").JSX.Element;
