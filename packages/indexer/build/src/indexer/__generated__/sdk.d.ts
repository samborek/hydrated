import * as Types from '@/indexer/__generated__/operations';
import { GraphQLClient, RequestOptions } from 'graphql-request';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
export declare const ExtrinsicFragmentDoc: import("graphql").DocumentNode;
export declare const ExtrinsicByHashDocument: import("graphql").DocumentNode;
export declare const ExtrinsicByBlockAndIndexDocument: import("graphql").DocumentNode;
export declare const OtcOrderStatusDocument: import("graphql").DocumentNode;
export declare const AccumulatedRpsUpdatedEventsDocument: import("graphql").DocumentNode;
export declare const StakingInitializedEventsDocument: import("graphql").DocumentNode;
export type SdkFunctionWrapper = <T>(action: (requestHeaders?: Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;
export declare function getSdk(client: GraphQLClient, withWrapper?: SdkFunctionWrapper): {
    ExtrinsicByHash(variables: Types.ExtrinsicByHashQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit["signal"]): Promise<Types.ExtrinsicByHashQuery>;
    ExtrinsicByBlockAndIndex(variables: Types.ExtrinsicByBlockAndIndexQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit["signal"]): Promise<Types.ExtrinsicByBlockAndIndexQuery>;
    OtcOrderStatus(variables: Types.OtcOrderStatusQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit["signal"]): Promise<Types.OtcOrderStatusQuery>;
    AccumulatedRpsUpdatedEvents(variables?: Types.AccumulatedRpsUpdatedEventsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit["signal"]): Promise<Types.AccumulatedRpsUpdatedEventsQuery>;
    StakingInitializedEvents(variables?: Types.StakingInitializedEventsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit["signal"]): Promise<Types.StakingInitializedEventsQuery>;
};
export type Sdk = ReturnType<typeof getSdk>;
export {};
