type Action = "enable" | "switch" | "disable";
export declare const getAction: (selectedMode: number, activeMode: number) => <T>(dataMap: Record<Action, T>) => T;
export declare const getEmodeMessage: (label: string) => string;
export {};
