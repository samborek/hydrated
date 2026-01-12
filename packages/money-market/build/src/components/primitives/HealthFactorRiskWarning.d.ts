import { FlexProps } from "@galacticcouncil/ui/components";
export type HealthFactorRiskWarningProps = FlexProps & {
    canContinue?: boolean;
    message: string;
    accepted: boolean;
    isUserConsentRequired: boolean;
    onAcceptedChange: (checked: boolean) => void;
};
export declare const HealthFactorRiskWarning: React.FC<HealthFactorRiskWarningProps>;
