import { SquidSdk } from "@/squid";
import { EventDataFragment } from "@/squid/__generated__/operations";
export type MoneyMarketEventName = Capitalize<keyof EventDataFragment>;
export declare const moneyMarketQuery: (squidSdk: SquidSdk, address: string, eventNames: Array<MoneyMarketEventName>, searchPhrase: string, pageSize: number, pageIndex: number) => import("@tanstack/query-core").OmitKeyof<import("@tanstack/react-query").UseQueryOptions<import("@/squid").MoneyMarketEventsQuery, Error, import("@/squid").MoneyMarketEventsQuery, (string | number | ("__typename" | "Supply" | "Withdraw" | "Borrow" | "Repay" | "ReserveUsedAsCollateralEnabled" | "ReserveUsedAsCollateralDisabled" | "LiquidationCall" | "UserEModeSet")[])[]>, "queryFn"> & {
    queryFn?: import("@tanstack/query-core").QueryFunction<import("@/squid").MoneyMarketEventsQuery, (string | number | ("__typename" | "Supply" | "Withdraw" | "Borrow" | "Repay" | "ReserveUsedAsCollateralEnabled" | "ReserveUsedAsCollateralDisabled" | "LiquidationCall" | "UserEModeSet")[])[], never> | undefined;
} & {
    queryKey: (string | number | ("__typename" | "Supply" | "Withdraw" | "Borrow" | "Repay" | "ReserveUsedAsCollateralEnabled" | "ReserveUsedAsCollateralDisabled" | "LiquidationCall" | "UserEModeSet")[])[] & {
        [dataTagSymbol]: import("@/squid").MoneyMarketEventsQuery;
        [dataTagErrorSymbol]: Error;
    };
};
