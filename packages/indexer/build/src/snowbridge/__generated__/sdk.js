export const TransferStatusToPolkadotDocument = `
    query TransferStatusToPolkadot($hash: String!, $limit: Int = 10) {
  transferStatusToPolkadots(
    where: {messageId_eq: $hash, OR: {txHash_eq: $hash}}
    limit: $limit
  ) {
    status
    timestamp
    messageId
  }
}
    `;
export const TransferStatusToEthDocument = `
    query TransferStatusToEth($hash: String!, $limit: Int = 10) {
  transferStatusToEthereums(
    where: {messageId_eq: $hash, OR: {txHash_eq: $hash}}
    limit: $limit
  ) {
    status
    timestamp
    messageId
  }
}
    `;
const defaultWrapper = (action, _operationName, _operationType, _variables) => action();
export function getSdk(client, withWrapper = defaultWrapper) {
    return {
        TransferStatusToPolkadot(variables, requestHeaders, signal) {
            return withWrapper((wrappedRequestHeaders) => client.request({ document: TransferStatusToPolkadotDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'TransferStatusToPolkadot', 'query', variables);
        },
        TransferStatusToEth(variables, requestHeaders, signal) {
            return withWrapper((wrappedRequestHeaders) => client.request({ document: TransferStatusToEthDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'TransferStatusToEth', 'query', variables);
        }
    };
}
