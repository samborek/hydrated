import { FlexProps, TextSize } from "@galacticcouncil/ui/components";
import { ResponsiveStyleValue } from "@galacticcouncil/ui/types";
export type HealthFactorChangeProps = FlexProps & {
    healthFactor: string;
    futureHealthFactor: string;
    loading?: boolean;
    fontSize?: TextSize | ResponsiveStyleValue<number>;
};
export declare const HealthFactorChange: React.FC<HealthFactorChangeProps>;
