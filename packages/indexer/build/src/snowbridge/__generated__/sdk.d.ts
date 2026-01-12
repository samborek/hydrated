import * as Types from '@/snowbridge/__generated__/operations';
import { GraphQLClient, RequestOptions } from 'graphql-request';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
export declare const TransferStatusToPolkadotDocument = "\n    query TransferStatusToPolkadot($hash: String!, $limit: Int = 10) {\n  transferStatusToPolkadots(\n    where: {messageId_eq: $hash, OR: {txHash_eq: $hash}}\n    limit: $limit\n  ) {\n    status\n    timestamp\n    messageId\n  }\n}\n    ";
export declare const TransferStatusToEthDocument = "\n    query TransferStatusToEth($hash: String!, $limit: Int = 10) {\n  transferStatusToEthereums(\n    where: {messageId_eq: $hash, OR: {txHash_eq: $hash}}\n    limit: $limit\n  ) {\n    status\n    timestamp\n    messageId\n  }\n}\n    ";
export type SdkFunctionWrapper = <T>(action: (requestHeaders?: Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;
export declare function getSdk(client: GraphQLClient, withWrapper?: SdkFunctionWrapper): {
    TransferStatusToPolkadot(variables: Types.TransferStatusToPolkadotQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit["signal"]): Promise<Types.TransferStatusToPolkadotQuery>;
    TransferStatusToEth(variables: Types.TransferStatusToEthQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit["signal"]): Promise<Types.TransferStatusToEthQuery>;
};
export type Sdk = ReturnType<typeof getSdk>;
export {};
