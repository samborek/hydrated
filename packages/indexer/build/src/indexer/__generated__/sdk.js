import gql from 'graphql-tag';
export const ExtrinsicFragmentDoc = gql `
    fragment Extrinsic on Extrinsic {
  hash
  block {
    height
    timestamp
  }
  indexInBlock
  success
  error
}
    `;
export const ExtrinsicByHashDocument = gql `
    query ExtrinsicByHash($hash: String!) {
  extrinsics(where: {hash_eq: $hash}) {
    ...Extrinsic
  }
}
    ${ExtrinsicFragmentDoc}`;
export const ExtrinsicByBlockAndIndexDocument = gql `
    query ExtrinsicByBlockAndIndex($blockNumber: Int!, $index: Int!) {
  extrinsics(where: {block: {height_eq: $blockNumber}, indexInBlock_eq: $index}) {
    ...Extrinsic
  }
}
    ${ExtrinsicFragmentDoc}`;
export const OtcOrderStatusDocument = gql `
    query OtcOrderStatus($orderId: Int!) {
  events(
    where: {args_jsonContains: {orderId: $orderId}, AND: {name_eq: "OTC.Placed"}}
  ) {
    args
  }
}
    `;
export const AccumulatedRpsUpdatedEventsDocument = gql `
    query AccumulatedRpsUpdatedEvents {
  events(
    where: {name_eq: "Staking.AccumulatedRpsUpdated"}
    orderBy: [block_height_ASC]
  ) {
    args
    block {
      height
    }
    name
  }
}
    `;
export const StakingInitializedEventsDocument = gql `
    query StakingInitializedEvents {
  events(where: {name_eq: "Staking.StakingInitialized"}) {
    block {
      height
    }
    name
  }
}
    `;
const defaultWrapper = (action, _operationName, _operationType, _variables) => action();
export function getSdk(client, withWrapper = defaultWrapper) {
    return {
        ExtrinsicByHash(variables, requestHeaders, signal) {
            return withWrapper((wrappedRequestHeaders) => client.request({ document: ExtrinsicByHashDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'ExtrinsicByHash', 'query', variables);
        },
        ExtrinsicByBlockAndIndex(variables, requestHeaders, signal) {
            return withWrapper((wrappedRequestHeaders) => client.request({ document: ExtrinsicByBlockAndIndexDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'ExtrinsicByBlockAndIndex', 'query', variables);
        },
        OtcOrderStatus(variables, requestHeaders, signal) {
            return withWrapper((wrappedRequestHeaders) => client.request({ document: OtcOrderStatusDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'OtcOrderStatus', 'query', variables);
        },
        AccumulatedRpsUpdatedEvents(variables, requestHeaders, signal) {
            return withWrapper((wrappedRequestHeaders) => client.request({ document: AccumulatedRpsUpdatedEventsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'AccumulatedRpsUpdatedEvents', 'query', variables);
        },
        StakingInitializedEvents(variables, requestHeaders, signal) {
            return withWrapper((wrappedRequestHeaders) => client.request({ document: StakingInitializedEventsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'StakingInitializedEvents', 'query', variables);
        }
    };
}
