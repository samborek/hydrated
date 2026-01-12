import { getSdk } from "@/snowbridge/__generated__/sdk";
export * from "./transfer";
export * from "@/snowbridge/__generated__/operations";
export * from "@/snowbridge/__generated__/types";
export declare const getSnowbridgeSdk: (url: string) => {
    TransferStatusToPolkadot(variables: import("@/snowbridge/__generated__/operations").TransferStatusToPolkadotQueryVariables, requestHeaders?: HeadersInit | undefined, signal?: RequestInit["signal"]): Promise<import("@/snowbridge/__generated__/operations").TransferStatusToPolkadotQuery>;
    TransferStatusToEth(variables: import("@/snowbridge/__generated__/operations").TransferStatusToEthQueryVariables, requestHeaders?: HeadersInit | undefined, signal?: RequestInit["signal"]): Promise<import("@/snowbridge/__generated__/operations").TransferStatusToEthQuery>;
};
export type SnowbridgeSdk = ReturnType<typeof getSdk>;
