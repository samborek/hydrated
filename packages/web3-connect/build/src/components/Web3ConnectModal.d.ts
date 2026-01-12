import { SquidSdk } from "@galacticcouncil/indexer/squid";
import { FC } from "react";
import { Account, WalletMode } from "@/hooks/useWeb3Connect";
type ControlledProps = {
    readonly squidSdk: SquidSdk;
    readonly open: boolean;
    readonly mode: WalletMode;
    readonly onOpenChange: (open: boolean) => void;
    readonly onAccountSelect: (account: Account) => void;
};
type UncontrolledProps = {
    readonly squidSdk: SquidSdk;
};
type Props = ControlledProps | UncontrolledProps;
export declare const Web3ConnectModal: FC<Props>;
export {};
