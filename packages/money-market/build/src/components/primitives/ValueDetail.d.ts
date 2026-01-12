import { FlexProps } from "@galacticcouncil/ui/components";
export type ValueDetailProps = FlexProps & {
    value: string;
    subValue?: string;
};
export declare const ValueDetail: React.FC<ValueDetailProps>;
