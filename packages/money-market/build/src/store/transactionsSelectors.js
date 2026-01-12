export const selectSuccessfulTransactions = (state) => {
    const successfulTransactions = {};
    Object.keys(state.transactions).forEach((chainId) => {
        const chainIdNumber = +chainId;
        const successfulTxHashes = Object.keys(state.transactions[chainIdNumber]).filter((txHash) => state.transactions[chainIdNumber][txHash].txState === "success");
        successfulTransactions[chainIdNumber] = successfulTxHashes.reduce((acc, txHash) => {
            acc[txHash] = state.transactions[chainIdNumber][txHash];
            return acc;
        }, {});
    });
    return successfulTransactions;
};
