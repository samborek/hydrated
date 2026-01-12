import { TextSize } from "@galacticcouncil/ui/components";
import { ResponsiveStyleValue } from "@galacticcouncil/ui/types";
export type HealthFactorNumberProps = {
    value: string;
    fontSize?: TextSize | ResponsiveStyleValue<number>;
};
export declare const HealthFactorNumber: React.FC<HealthFactorNumberProps>;
