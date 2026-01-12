import { WalletBalanceProvider } from "@aave/contract-helpers";
export class WalletBalanceService {
    getProvider;
    constructor(getProvider) {
        this.getProvider = getProvider;
    }
    getWalletBalanceService(chainId, walletBalanceProviderAddress) {
        const provider = this.getProvider(chainId);
        return new WalletBalanceProvider({
            walletBalanceProviderAddress,
            provider,
        });
    }
    async getPoolTokensBalances(marketData, user) {
        const walletBalanceService = this.getWalletBalanceService(marketData.chainId, marketData.addresses.WALLET_BALANCE_PROVIDER);
        const { 0: tokenAddresses, 1: balances } = await walletBalanceService.getUserWalletBalancesForLendingPoolProvider(user, marketData.addresses.LENDING_POOL_ADDRESS_PROVIDER);
        const mappedBalances = tokenAddresses.map((address, ix) => ({
            address: address.toLowerCase(),
            amount: balances[ix].toString(),
        }));
        return mappedBalances;
    }
}
