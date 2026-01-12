import { produce } from "immer";
export const createTransactionsSlice = (set, get) => {
    return {
        transactions: [],
        addTransaction: (txHash, transaction, context = {}) => {
            const chainId = context.chainId ?? get().currentChainId;
            const market = context.market === undefined ? get().currentMarket : context.market;
            set((state) => produce(state, (draft) => {
                draft.transactions[chainId] = {
                    ...draft.transactions[chainId],
                    [txHash]: {
                        ...transaction,
                        market,
                    },
                };
            }));
        },
    };
};
