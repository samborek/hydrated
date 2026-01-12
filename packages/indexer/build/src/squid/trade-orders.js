import { QUERY_KEY_BLOCK_PREFIX } from "@galacticcouncil/utils";
import { queryOptions } from "@tanstack/react-query";
export var DcaScheduleStatus;
(function (DcaScheduleStatus) {
    DcaScheduleStatus["Created"] = "Created";
    DcaScheduleStatus["Completed"] = "Completed";
    DcaScheduleStatus["Terminated"] = "Terminated";
})(DcaScheduleStatus || (DcaScheduleStatus = {}));
export const isDcaScheduleStatus = (status) => Object.values(DcaScheduleStatus).includes(status);
export var DcaScheduleExecutionStatus;
(function (DcaScheduleExecutionStatus) {
    DcaScheduleExecutionStatus["Planned"] = "Planned";
    DcaScheduleExecutionStatus["Executed"] = "Executed";
    DcaScheduleExecutionStatus["Failed"] = "Failed";
})(DcaScheduleExecutionStatus || (DcaScheduleExecutionStatus = {}));
export const isDcaScheduleExecutionStatus = (status) => Object.values(DcaScheduleExecutionStatus).includes(status);
export var TradeOperation;
(function (TradeOperation) {
    TradeOperation["ExactIn"] = "ExactIn";
    TradeOperation["ExactOut"] = "ExactOut";
    TradeOperation["Limit"] = "Limit";
    TradeOperation["LiquidityAdd"] = "LiquidityAdd";
    TradeOperation["LiquidityRemove"] = "LiquidityRemove";
})(TradeOperation || (TradeOperation = {}));
export const isTradeOperation = (status) => Object.values(TradeOperation).includes(status);
export const userSwapsQuery = (squidSdk, address, assetIds, page, pageSize) => queryOptions({
    queryKey: [
        QUERY_KEY_BLOCK_PREFIX,
        "trade",
        "orders",
        address,
        assetIds,
        page,
        pageSize,
    ],
    queryFn: () => squidSdk.UserSwaps({
        ...(address &&
            typeof address === "string" && {
            swapperIdFilter: {
                equalTo: address,
            },
        }),
        ...(assetIds.length && {
            allInvolvedAssetRegistryIds: { contains: assetIds },
        }),
        offset: (page - 1) * pageSize,
        pageSize,
    }),
    enabled: !!address,
});
export const userOrdersQuery = (squidSdk, address, status, assetIds, page, pageSize) => queryOptions({
    queryKey: [
        QUERY_KEY_BLOCK_PREFIX,
        "trade",
        "openOrders",
        "list",
        address,
        status,
        assetIds,
        page,
        pageSize,
    ],
    queryFn: () => squidSdk.UserOrders({
        address,
        ...(assetIds.length && {
            assetInId: { in: assetIds },
            assetOutId: { in: assetIds },
        }),
        status,
        offset: (page - 1) * pageSize,
        pageSize,
    }),
    enabled: !!address,
});
export const userOpenOrdersCountQuery = (squidSdk, address, assetIds) => queryOptions({
    queryKey: [
        QUERY_KEY_BLOCK_PREFIX,
        "trade",
        "openOrders",
        "count",
        address,
        assetIds,
    ],
    queryFn: () => squidSdk.UserOpenOrdersCount({
        address,
        ...(assetIds.length && {
            assetFilter: {
                assetInId: { in: assetIds },
                assetOutId: { in: assetIds },
            },
        }),
    }),
    enabled: !!address,
});
export const dcaScheduleExecutionsQuery = (squidSdk, scheduleId) => queryOptions({
    queryKey: [
        QUERY_KEY_BLOCK_PREFIX,
        "trade",
        "dcaSchedule",
        "swaps",
        scheduleId,
    ],
    queryFn: () => squidSdk.DcaScheduleExecutions({
        scheduleId: scheduleId.toString(),
    }),
    enabled: !!scheduleId,
});
export const useRoutedTradesQuery = (squidSdk, address, assetIds, page, pageSize) => queryOptions({
    queryKey: [
        QUERY_KEY_BLOCK_PREFIX,
        "trade",
        "routedTrades",
        address,
        assetIds,
        page,
        pageSize,
    ],
    queryFn: () => squidSdk.RoutedTrades({
        address,
        ...(assetIds.length && {
            inputAssetRegistryIds: { containedBy: assetIds },
            outputAssetRegistryIds: { containedBy: assetIds },
        }),
        offset: (page - 1) * pageSize,
        pageSize,
    }),
    enabled: !!address,
});
