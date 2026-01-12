import { normalize, USD_DECIMALS } from "@aave/math-utils";
import { Big } from "big.js";
import { useMemo, useState } from "react";
import { useDeepCompareEffect } from "react-use";
import { usePoolsReservesHumanized } from "@/hooks/pool/usePoolReserves";
import { usePoolsTokensBalance } from "@/hooks/pool/usePoolTokensBalance";
import { useRootStore } from "@/store/root";
import { nativeToUSD } from "@/utils";
const formatAggregatedBalance = ({ reservesHumanized, balances, }) => {
    const reserves = reservesHumanized?.reservesData || [];
    const baseCurrencyData = reservesHumanized?.baseCurrencyData || {
        marketReferenceCurrencyDecimals: 0,
        marketReferenceCurrencyPriceInUsd: "0",
        networkBaseTokenPriceInUsd: "0",
        networkBaseTokenPriceDecimals: 0,
    };
    const walletBalances = balances ?? [];
    // process data
    let hasEmptyWallet = true;
    const aggregatedBalance = walletBalances.reduce((acc, reserve) => {
        const poolReserve = reserves.find((poolReserve) => {
            return poolReserve.underlyingAsset.toLowerCase() === reserve.address;
        });
        if (reserve.amount !== "0")
            hasEmptyWallet = false;
        if (poolReserve) {
            acc[reserve.address] = {
                amount: normalize(reserve.amount, poolReserve.decimals),
                amountUSD: nativeToUSD({
                    amount: Big(reserve.amount),
                    currencyDecimals: poolReserve.decimals,
                    priceInMarketReferenceCurrency: poolReserve.priceInMarketReferenceCurrency,
                    marketReferenceCurrencyDecimals: baseCurrencyData.marketReferenceCurrencyDecimals,
                    normalizedMarketReferencePriceInUsd: normalize(baseCurrencyData.marketReferenceCurrencyPriceInUsd, USD_DECIMALS),
                }),
            };
        }
        return acc;
    }, {});
    return {
        walletBalances: aggregatedBalance,
        hasEmptyWallet,
    };
};
export const usePoolsWalletBalances = (marketDatas) => {
    const user = useRootStore((store) => store.account);
    const tokensBalanceQueries = usePoolsTokensBalance(marketDatas, user);
    const poolsBalancesQueries = usePoolsReservesHumanized(marketDatas);
    const isLoading = tokensBalanceQueries.find((elem) => elem.isInitialLoading) ||
        poolsBalancesQueries.find((elem) => elem.isInitialLoading);
    const walletBalances = useMemo(() => {
        if (isLoading)
            return [];
        const walletBalances = poolsBalancesQueries.map((query, index) => formatAggregatedBalance({
            reservesHumanized: query.data,
            balances: tokensBalanceQueries[index]?.data,
            marketData: marketDatas[index],
        }));
        return walletBalances;
    }, [isLoading, marketDatas, poolsBalancesQueries, tokensBalanceQueries]);
    return {
        isLoading,
        walletBalances,
    };
};
export const useWalletBalances = (marketData) => {
    const { walletBalances, isLoading } = usePoolsWalletBalances([marketData]);
    const [balances, setBalances] = useState({});
    const [loading, setLoading] = useState(true);
    const [hasEmptyWallet, setHasEmptyWallet] = useState(true);
    useDeepCompareEffect(() => {
        setBalances(walletBalances[0]?.walletBalances ?? {});
        setLoading(!!isLoading);
        setHasEmptyWallet(walletBalances[0]?.hasEmptyWallet);
    }, [walletBalances[0]?.walletBalances, { isLoading }]);
    return {
        walletBalances: balances,
        hasEmptyWallet,
        loading,
    };
};
