import { AssetLogoProps } from "@galacticcouncil/ui/components";
export type ReserveLogoProps = AssetLogoProps & {
    address: string;
};
export declare const ReserveLogo: React.FC<ReserveLogoProps>;
