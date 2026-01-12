import React from "react";
import { Web3Data } from "@/libs/web3-data-provider/Web3Provider";
export type Web3ContextData = {
    web3ProviderData: Web3Data;
};
export declare const Web3Context: React.Context<Web3ContextData>;
export declare const useWeb3Context: () => Web3Data;
