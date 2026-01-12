export const SupplyFragmentDoc = `
    fragment Supply on MmSupply {
  asset {
    assetRegistryId
  }
  amount
}
    `;
export const WithdrawFragmentDoc = `
    fragment Withdraw on MmWithdraw {
  asset {
    assetRegistryId
  }
  amount
}
    `;
export const BorrowFragmentDoc = `
    fragment Borrow on MmBorrow {
  asset {
    assetRegistryId
  }
  amount
}
    `;
export const RepayFragmentDoc = `
    fragment Repay on MmRepay {
  asset {
    assetRegistryId
  }
  amount
}
    `;
export const CollateralEnabledFragmentDoc = `
    fragment CollateralEnabled on MmReserveUsedAsCollateralEnabledEvent {
  asset {
    assetRegistryId
  }
}
    `;
export const CollateralDisabledFragmentDoc = `
    fragment CollateralDisabled on MmReserveUsedAsCollateralDisabledEvent {
  asset {
    assetRegistryId
  }
}
    `;
export const LiquidationCallFragmentDoc = `
    fragment LiquidationCall on MmLiquidationCall {
  asset: collateralAsset {
    assetRegistryId
  }
  amount: liquidatedCollateralAmount
}
    `;
export const UserEModeFragmentDoc = `
    fragment UserEMode on MmUserEModeSet {
  categoryId
}
    `;
export const EventDataFragmentDoc = `
    fragment EventData on MoneyMarketEvent {
  supply {
    ...Supply
  }
  withdraw {
    ...Withdraw
  }
  borrow {
    ...Borrow
  }
  repay {
    ...Repay
  }
  reserveUsedAsCollateralEnabled {
    ...CollateralEnabled
  }
  reserveUsedAsCollateralDisabled {
    ...CollateralDisabled
  }
  liquidationCall {
    ...LiquidationCall
  }
  userEModeSet {
    ...UserEMode
  }
}
    ${SupplyFragmentDoc}
${WithdrawFragmentDoc}
${BorrowFragmentDoc}
${RepayFragmentDoc}
${CollateralEnabledFragmentDoc}
${CollateralDisabledFragmentDoc}
${LiquidationCallFragmentDoc}
${UserEModeFragmentDoc}`;
export const MoneyMarketEventFragmentDoc = `
    fragment MoneyMarketEvent on MoneyMarketEvent {
  ...EventData
  eventName
  event {
    block {
      timestamp
    }
  }
}
    ${EventDataFragmentDoc}`;
export const SwapDcaScheduleFragmentDoc = `
    fragment SwapDcaSchedule on DcaSchedule {
  id
  status
  assetInId
  budgetAmountIn: totalAmount
  totalExecutedAmountIn
}
    `;
export const SwapFragmentDoc = `
    fragment Swap on Swap {
  paraTimestamp
  operationType
  swapperId
  event {
    paraBlockHeight
    indexInBlock
  }
  swapInputs {
    nodes {
      asset {
        assetRegistryId
      }
      amount
    }
  }
  swapOutputs {
    nodes {
      asset {
        assetRegistryId
      }
      amount
    }
  }
  dcaScheduleExecutionEvent {
    scheduleExecution {
      schedule {
        ...SwapDcaSchedule
      }
      status
    }
  }
}
    ${SwapDcaScheduleFragmentDoc}`;
export const RoutedTradeSwapFragmentDoc = `
    fragment RoutedTradeSwap on Swap {
  dcaScheduleExecutionEvent {
    scheduleExecution {
      schedule {
        ...SwapDcaSchedule
      }
    }
  }
}
    ${SwapDcaScheduleFragmentDoc}`;
export const AccountTotalBalancesByPeriodDocument = `
    query AccountTotalBalancesByPeriod($accountId: String!, $startTimestamp: String, $endTimestamp: String, $bucketSize: TimeSeriesBucketTimeRange) {
  accountTotalBalancesByPeriod(
    filter: {accountId: $accountId, startTimestamp: $startTimestamp, endTimestamp: $endTimestamp, bucketSize: $bucketSize}
  ) {
    nodes {
      referenceAssetId
      buckets {
        transferableNorm
        timestamp
      }
    }
  }
}
    `;
export const LatestAccountsBalancesDocument = `
    query LatestAccountsBalances($accountId: String) {
  accountTotalBalanceHistoricalData(
    filter: {accountId: {equalTo: $accountId}}
    last: 1
  ) {
    nodes {
      totalTransferableNorm
    }
  }
}
    `;
export const LatestBlockHeightQueryDocument = `
    query LatestBlockHeightQuery {
  blocks(last: 1) {
    edges {
      node {
        height
      }
    }
  }
}
    `;
export const MoneyMarketEventsDocument = `
    query MoneyMarketEvents($filter: MoneyMarketEventFilter, $first: Int, $offset: Int) {
  moneyMarketEvents(
    first: $first
    offset: $offset
    filter: $filter
    orderBy: [EVENT_ID_DESC]
  ) {
    totalCount
    nodes {
      ...MoneyMarketEvent
    }
  }
}
    ${MoneyMarketEventFragmentDoc}`;
export const PlatformTotalDocument = `
    query PlatformTotal {
  platformTotalTvl {
    nodes {
      omnipoolTvlNorm
      stablepoolsTvlNorm
    }
  }
  platformTotalVolumesByPeriod(filter: {period: _24H_}) {
    nodes {
      omnipoolVolNorm
      stableswapVolNorm
    }
  }
}
    `;
export const OmnipoolYieldMetricsDocument = `
    query OmnipoolYieldMetrics {
  omnipoolAssetsYieldMetrics {
    nodes {
      assetId
      assetRegistryId
      projectedAprPerc
    }
  }
}
    `;
export const StableswapYieldMetricsDocument = `
    query StableswapYieldMetrics {
  stableswapYieldMetrics {
    nodes {
      poolId
      projectedAprPerc
      projectedApyPerc
    }
  }
}
    `;
export const UserSwapsDocument = `
    query UserSwaps($swapperIdFilter: StringFilter, $allInvolvedAssetRegistryIds: StringListFilter, $offset: Int!, $pageSize: Int!) {
  swaps(
    filter: {swapperId: $swapperIdFilter, allInvolvedAssetRegistryIds: $allInvolvedAssetRegistryIds, operationType: {in: ["ExactIn", "ExactOut"]}}
    offset: $offset
    first: $pageSize
    orderBy: ID_DESC
  ) {
    totalCount
    nodes {
      ...Swap
    }
  }
}
    ${SwapFragmentDoc}`;
export const UserOrdersDocument = `
    query UserOrders($address: String!, $assetInId: StringFilter, $assetOutId: StringFilter, $offset: Int!, $pageSize: Int!, $status: [String!]!) {
  dcaSchedules(
    condition: {ownerId: $address}
    filter: {status: {in: $status}, assetInId: $assetInId, assetOutId: $assetOutId}
    offset: $offset
    first: $pageSize
    orderBy: PARA_BLOCK_HEIGHT_DESC
  ) {
    totalCount
    nodes {
      id
      status
      orderType
      assetIn {
        assetRegistryId
      }
      totalExecutedAmountIn
      budgetAmountIn: totalAmount
      singleTradeSize: amountIn
      assetOut {
        assetRegistryId
      }
      totalExecutedAmountOut
      period
    }
  }
}
    `;
export const UserOpenOrdersCountDocument = `
    query UserOpenOrdersCount($address: String!, $assetFilter: DcaScheduleFilter) {
  dcaSchedules(
    condition: {status: "Created", ownerId: $address}
    filter: $assetFilter
  ) {
    totalCount
  }
}
    `;
export const DcaScheduleExecutionsDocument = `
    query DcaScheduleExecutions($scheduleId: String!) {
  dcaSchedule(id: $scheduleId) {
    assetIn {
      assetRegistryId
    }
    assetOut {
      assetRegistryId
    }
    dcaScheduleExecutionsByScheduleId(
      filter: {status: {in: ["Executed", "Failed"]}}
      orderBy: ID_DESC
    ) {
      nodes {
        id
        status
        amountIn
        amountOut
        dcaScheduleExecutionEventsByScheduleExecutionId(
          first: 1
          filter: {eventName: {in: ["Executed", "Failed"]}}
          orderBy: PARA_BLOCK_HEIGHT_ASC
        ) {
          nodes {
            event {
              paraBlockHeight
              indexInBlock
              block {
                timestamp
              }
            }
          }
        }
      }
    }
  }
}
    `;
export const RoutedTradesDocument = `
    query RoutedTrades($address: String!, $inputAssetRegistryIds: StringListFilter, $outputAssetRegistryIds: StringListFilter, $offset: Int!, $pageSize: Int!) {
  routedTrades(
    filter: {participantSwappers: {contains: [$address]}, inputAssetRegistryIds: $inputAssetRegistryIds, outputAssetRegistryIds: $outputAssetRegistryIds}
    offset: $offset
    first: $pageSize
    orderBy: PARA_BLOCK_HEIGHT_DESC
  ) {
    totalCount
    nodes {
      block {
        timestamp
      }
      routeTradeInputs {
        nodes {
          asset {
            assetRegistryId
          }
          amount
        }
      }
      routeTradeOutputs {
        nodes {
          asset {
            assetRegistryId
          }
          amount
        }
      }
      swaps(first: 1) {
        nodes {
          ...RoutedTradeSwap
        }
      }
    }
  }
}
    ${RoutedTradeSwapFragmentDoc}`;
export const TradePricesDocument = `
    query TradePrices($assetInId: String!, $assetOutId: String!, $startTimestamp: String, $endTimestamp: String, $bucketSize: TimeSeriesBucketTimeRange) {
  assetPairPricesAndVolumesByPeriod(
    filter: {assetInRegistryId: $assetInId, assetOutRegistryId: $assetOutId, startTimestamp: $startTimestamp, endTimestamp: $endTimestamp, bucketSize: $bucketSize}
  ) {
    nodes {
      buckets {
        timestamp
        priceAvrgNorm
        referenceAssetVolNorm
      }
    }
  }
}
    `;
export const XykVolumeDocument = `
    query XykVolume($filter: XykpoolVolumeHistoricalDataByPeriodFilter!) {
  xykpoolVolumeHistoricalDataByPeriod(filter: $filter) {
    nodes {
      assetAAssetRegistryId
      assetAId
      assetAVol
      assetAVolNorm
      assetBAssetRegistryId
      assetBId
      assetBVol
      assetBVolNorm
      poolId
    }
  }
}
    `;
export const OmnipoolVolumeDocument = `
    query OmnipoolVolume($filter: OmnipoolAssetVolumeHistoricalDataByPeriodFilter!) {
  omnipoolAssetVolumeHistoricalDataByPeriod(filter: $filter) {
    nodes {
      assetId
      assetRegistryId
      assetVol
      assetVolNormalized
    }
  }
}
    `;
export const StablepoolVolumeDocument = `
    query StablepoolVolume($filter: StableswapVolumeHistoricalDataByPeriodFilter!) {
  stableswapVolumeHistoricalDataByPeriod(filter: $filter) {
    nodes {
      poolId
      poolVolNorm
      assetVolumes {
        assetRegistryId
        assetId
        assetVol
        assetVolNorm
      }
    }
  }
}
    `;
const defaultWrapper = (action, _operationName, _operationType, _variables) => action();
export function getSdk(client, withWrapper = defaultWrapper) {
    return {
        AccountTotalBalancesByPeriod(variables, requestHeaders, signal) {
            return withWrapper((wrappedRequestHeaders) => client.request({ document: AccountTotalBalancesByPeriodDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'AccountTotalBalancesByPeriod', 'query', variables);
        },
        LatestAccountsBalances(variables, requestHeaders, signal) {
            return withWrapper((wrappedRequestHeaders) => client.request({ document: LatestAccountsBalancesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'LatestAccountsBalances', 'query', variables);
        },
        LatestBlockHeightQuery(variables, requestHeaders, signal) {
            return withWrapper((wrappedRequestHeaders) => client.request({ document: LatestBlockHeightQueryDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'LatestBlockHeightQuery', 'query', variables);
        },
        MoneyMarketEvents(variables, requestHeaders, signal) {
            return withWrapper((wrappedRequestHeaders) => client.request({ document: MoneyMarketEventsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'MoneyMarketEvents', 'query', variables);
        },
        PlatformTotal(variables, requestHeaders, signal) {
            return withWrapper((wrappedRequestHeaders) => client.request({ document: PlatformTotalDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'PlatformTotal', 'query', variables);
        },
        OmnipoolYieldMetrics(variables, requestHeaders, signal) {
            return withWrapper((wrappedRequestHeaders) => client.request({ document: OmnipoolYieldMetricsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'OmnipoolYieldMetrics', 'query', variables);
        },
        StableswapYieldMetrics(variables, requestHeaders, signal) {
            return withWrapper((wrappedRequestHeaders) => client.request({ document: StableswapYieldMetricsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'StableswapYieldMetrics', 'query', variables);
        },
        UserSwaps(variables, requestHeaders, signal) {
            return withWrapper((wrappedRequestHeaders) => client.request({ document: UserSwapsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UserSwaps', 'query', variables);
        },
        UserOrders(variables, requestHeaders, signal) {
            return withWrapper((wrappedRequestHeaders) => client.request({ document: UserOrdersDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UserOrders', 'query', variables);
        },
        UserOpenOrdersCount(variables, requestHeaders, signal) {
            return withWrapper((wrappedRequestHeaders) => client.request({ document: UserOpenOrdersCountDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UserOpenOrdersCount', 'query', variables);
        },
        DcaScheduleExecutions(variables, requestHeaders, signal) {
            return withWrapper((wrappedRequestHeaders) => client.request({ document: DcaScheduleExecutionsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DcaScheduleExecutions', 'query', variables);
        },
        RoutedTrades(variables, requestHeaders, signal) {
            return withWrapper((wrappedRequestHeaders) => client.request({ document: RoutedTradesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'RoutedTrades', 'query', variables);
        },
        TradePrices(variables, requestHeaders, signal) {
            return withWrapper((wrappedRequestHeaders) => client.request({ document: TradePricesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'TradePrices', 'query', variables);
        },
        XykVolume(variables, requestHeaders, signal) {
            return withWrapper((wrappedRequestHeaders) => client.request({ document: XykVolumeDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'XykVolume', 'query', variables);
        },
        OmnipoolVolume(variables, requestHeaders, signal) {
            return withWrapper((wrappedRequestHeaders) => client.request({ document: OmnipoolVolumeDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'OmnipoolVolume', 'query', variables);
        },
        StablepoolVolume(variables, requestHeaders, signal) {
            return withWrapper((wrappedRequestHeaders) => client.request({ document: StablepoolVolumeDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'StablepoolVolume', 'query', variables);
        }
    };
}
