type HealthFactorLevel = "none" | "good" | "warning" | "danger";
export declare const useFormattedHealthFactor: (value: string) => {
    isHealthFactorValid: boolean;
    healthFactorLevel: HealthFactorLevel;
    healthFactor: string;
    healthFactorColor: string;
};
export {};
