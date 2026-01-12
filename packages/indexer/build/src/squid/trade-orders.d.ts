import { SquidSdk } from "@/squid";
export declare enum DcaScheduleStatus {
    Created = "Created",
    Completed = "Completed",
    Terminated = "Terminated"
}
export declare const isDcaScheduleStatus: (status: unknown) => status is DcaScheduleStatus;
export declare enum DcaScheduleExecutionStatus {
    Planned = "Planned",
    Executed = "Executed",
    Failed = "Failed"
}
export declare const isDcaScheduleExecutionStatus: (status: unknown) => status is DcaScheduleExecutionStatus;
export declare enum TradeOperation {
    ExactIn = "ExactIn",
    ExactOut = "ExactOut",
    Limit = "Limit",
    LiquidityAdd = "LiquidityAdd",
    LiquidityRemove = "LiquidityRemove"
}
export declare const isTradeOperation: (status: unknown) => status is TradeOperation;
type AllSwaps = true;
export type SwapsQueryAddress = string | AllSwaps;
export declare const userSwapsQuery: (squidSdk: SquidSdk, address: SwapsQueryAddress, assetIds: Array<string>, page: number, pageSize: number) => import("@tanstack/query-core").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<import("@/squid").UserSwapsQuery, Error, import("@/squid").UserSwapsQuery, (number | string[] | SwapsQueryAddress)[]>, "queryFn"> & {
    queryFn?: import("@tanstack/query-core").QueryFunction<import("@/squid").UserSwapsQuery, (number | string[] | SwapsQueryAddress)[], never> | undefined;
} & {
    queryKey: (number | string[] | SwapsQueryAddress)[] & {
        [dataTagSymbol]: import("@/squid").UserSwapsQuery;
        [dataTagErrorSymbol]: Error;
    };
};
export declare const userOrdersQuery: (squidSdk: SquidSdk, address: string, status: Array<DcaScheduleStatus>, assetIds: Array<string>, page: number, pageSize: number) => import("@tanstack/query-core").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<import("@/squid").UserOrdersQuery, Error, import("@/squid").UserOrdersQuery, (string | number | string[])[]>, "queryFn"> & {
    queryFn?: import("@tanstack/query-core").QueryFunction<import("@/squid").UserOrdersQuery, (string | number | string[])[], never> | undefined;
} & {
    queryKey: (string | number | string[])[] & {
        [dataTagSymbol]: import("@/squid").UserOrdersQuery;
        [dataTagErrorSymbol]: Error;
    };
};
export declare const userOpenOrdersCountQuery: (squidSdk: SquidSdk, address: string, assetIds: Array<string>) => import("@tanstack/query-core").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<import("@/squid").UserOpenOrdersCountQuery, Error, import("@/squid").UserOpenOrdersCountQuery, (string | string[])[]>, "queryFn"> & {
    queryFn?: import("@tanstack/query-core").QueryFunction<import("@/squid").UserOpenOrdersCountQuery, (string | string[])[], never> | undefined;
} & {
    queryKey: (string | string[])[] & {
        [dataTagSymbol]: import("@/squid").UserOpenOrdersCountQuery;
        [dataTagErrorSymbol]: Error;
    };
};
export declare const dcaScheduleExecutionsQuery: (squidSdk: SquidSdk, scheduleId: number) => import("@tanstack/query-core").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<import("@/squid").DcaScheduleExecutionsQuery, Error, import("@/squid").DcaScheduleExecutionsQuery, (string | number)[]>, "queryFn"> & {
    queryFn?: import("@tanstack/query-core").QueryFunction<import("@/squid").DcaScheduleExecutionsQuery, (string | number)[], never> | undefined;
} & {
    queryKey: (string | number)[] & {
        [dataTagSymbol]: import("@/squid").DcaScheduleExecutionsQuery;
        [dataTagErrorSymbol]: Error;
    };
};
export declare const useRoutedTradesQuery: (squidSdk: SquidSdk, address: string, assetIds: Array<string>, page: number, pageSize: number) => import("@tanstack/query-core").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<import("@/squid").RoutedTradesQuery, Error, import("@/squid").RoutedTradesQuery, (string | number | string[])[]>, "queryFn"> & {
    queryFn?: import("@tanstack/query-core").QueryFunction<import("@/squid").RoutedTradesQuery, (string | number | string[])[], never> | undefined;
} & {
    queryKey: (string | number | string[])[] & {
        [dataTagSymbol]: import("@/squid").RoutedTradesQuery;
        [dataTagErrorSymbol]: Error;
    };
};
export {};
