import { getSdk } from "@/indexer/__generated__/sdk";
export * from "./extrinsics";
export * from "./otc";
export * from "@/indexer/__generated__/operations";
export * from "@/indexer/__generated__/types";
export declare const getIndexerSdk: (url: string) => {
    ExtrinsicByHash(variables: import("@/indexer/__generated__/operations").ExtrinsicByHashQueryVariables, requestHeaders?: HeadersInit | undefined, signal?: RequestInit["signal"]): Promise<import("@/indexer/__generated__/operations").ExtrinsicByHashQuery>;
    ExtrinsicByBlockAndIndex(variables: import("@/indexer/__generated__/operations").ExtrinsicByBlockAndIndexQueryVariables, requestHeaders?: HeadersInit | undefined, signal?: RequestInit["signal"]): Promise<import("@/indexer/__generated__/operations").ExtrinsicByBlockAndIndexQuery>;
    OtcOrderStatus(variables: import("@/indexer/__generated__/operations").OtcOrderStatusQueryVariables, requestHeaders?: HeadersInit | undefined, signal?: RequestInit["signal"]): Promise<import("@/indexer/__generated__/operations").OtcOrderStatusQuery>;
    AccumulatedRpsUpdatedEvents(variables?: import("@/indexer/__generated__/operations").AccumulatedRpsUpdatedEventsQueryVariables, requestHeaders?: HeadersInit | undefined, signal?: RequestInit["signal"]): Promise<import("@/indexer/__generated__/operations").AccumulatedRpsUpdatedEventsQuery>;
    StakingInitializedEvents(variables?: import("@/indexer/__generated__/operations").StakingInitializedEventsQueryVariables, requestHeaders?: HeadersInit | undefined, signal?: RequestInit["signal"]): Promise<import("@/indexer/__generated__/operations").StakingInitializedEventsQuery>;
};
export type IndexerSdk = ReturnType<typeof getSdk>;
