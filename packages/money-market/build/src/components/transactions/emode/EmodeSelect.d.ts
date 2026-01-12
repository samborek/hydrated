import * as React from "react";
import { EmodeCategory } from "@/helpers/types";
export type EmodeSelectProps = {
    emodeCategories: Record<number, EmodeCategory>;
    selectedEmode: number | undefined;
    setSelectedEmode: React.Dispatch<React.SetStateAction<EmodeCategory | undefined>>;
    userEmode: number;
};
export declare const EmodeSelect: ({ emodeCategories, selectedEmode, setSelectedEmode, userEmode, }: EmodeSelectProps) => React.JSX.Element;
