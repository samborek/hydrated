import { ProtocolAction } from "@aave/contract-helpers";
import { PopulatedTransaction } from "ethers";
import React, { ReactElement } from "react";
import { MoneyMarketTxFn, ToastsConfig } from "@/types";
export type ERC20TokenType = {
    address: string;
    symbol: string;
    decimals: number;
    image?: string;
    aToken?: boolean;
};
type SendTxFn = (txData: PopulatedTransaction, toasts: ToastsConfig, action?: ProtocolAction) => Promise<void>;
export type Web3Data = {
    currentAccount: string;
    sendTx: SendTxFn;
};
export declare const Web3ContextProvider: React.FC<{
    children: ReactElement;
    onCreateTransaction: MoneyMarketTxFn;
}>;
export {};
