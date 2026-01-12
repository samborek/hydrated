import { ReserveIncentiveResponse } from "@aave/math-utils/dist/esm/formatters/incentive/calculate-reserve-incentives";
interface IncentivesButtonProps {
    symbol: string;
    incentives?: ReserveIncentiveResponse[];
    displayBlank?: boolean;
}
export declare const IncentivesButton: ({ incentives, symbol, }: IncentivesButtonProps) => import("react").JSX.Element | null;
type IncentivesTooltipContentProps = {
    incentives: ReserveIncentiveResponse[];
    incentivesNetAPR: "Infinity" | number;
    symbol: string;
};
export declare const IncentivesTooltipContent: React.FC<IncentivesTooltipContentProps>;
export {};
