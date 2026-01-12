import { ThemeUICSSProperties } from "@galacticcouncil/ui/types";
import { Wallet } from "@/types/wallet";
type Props = {
    readonly wallet: Wallet;
    readonly className?: string;
    readonly size?: ThemeUICSSProperties["size"];
};
export declare const ProviderLogo: ({ wallet, className, size }: Props) => import("react").JSX.Element;
export {};
