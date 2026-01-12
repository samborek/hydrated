export const queryKeysFactory = {
    pool: ["pool"],
    incentives: ["incentives"],
    gho: ["gho"],
    market: (marketData) => [
        marketData.chainId,
        !!marketData.isFork,
        marketData.market,
    ],
    user: (user) => [user],
    transactionHistory: (user, marketData) => [
        ...queryKeysFactory.user(user),
        ...queryKeysFactory.market(marketData),
        "transactionHistory",
    ],
    poolTokens: (user, marketData) => [
        ...queryKeysFactory.pool,
        ...queryKeysFactory.user(user),
        ...queryKeysFactory.market(marketData),
        "poolTokens",
    ],
    poolReservesDataHumanized: (marketData) => [
        ...queryKeysFactory.pool,
        ...queryKeysFactory.market(marketData),
        "poolReservesDataHumanized",
    ],
    paraswapRates: (chainId, amount, srcToken, destToken, user) => [
        ...queryKeysFactory.user(user),
        chainId,
        amount,
        srcToken,
        destToken,
        "paraswapRates",
    ],
    gasPrices: (chainId) => [chainId, "gasPrices"],
    poolApprovedAmount: (user, token, marketData) => [
        ...queryKeysFactory.pool,
        ...queryKeysFactory.user(user),
        ...queryKeysFactory.market(marketData),
        token,
        "poolApprovedAmount",
    ],
    approvedAmount: (user, token, spender, marketData) => [
        ...queryKeysFactory.user(user),
        ...queryKeysFactory.market(marketData),
        token,
        spender,
        "approvedAmount",
    ],
    tokenPowers: (user, token, chainId) => [
        ...queryKeysFactory.user(user),
        token,
        chainId,
        "tokenPowers",
    ],
    tokenDelegatees: (user, token, chainId) => [
        ...queryKeysFactory.user(user),
        token,
        chainId,
        "tokenDelegatees",
    ],
};
export const POLLING_INTERVAL = 60000;
