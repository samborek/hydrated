export class ApprovedAmountService {
    getProvider;
    constructor(getProvider) {
        this.getProvider = getProvider;
    }
    async getERC20Service(marketData) {
        const provider = this.getProvider(marketData.chainId);
        const ERC20Service = (await import("@aave/contract-helpers")).ERC20Service;
        return new ERC20Service(provider);
    }
    async getPoolService(marketData) {
        const provider = this.getProvider(marketData.chainId);
        const PoolBundle = (await import("@aave/contract-helpers")).PoolBundle;
        return new PoolBundle(provider, {
            POOL: marketData.addresses.LENDING_POOL,
            WETH_GATEWAY: marketData.addresses.WETH_GATEWAY,
            L2_ENCODER: marketData.addresses.L2_ENCODER,
        });
    }
    async getLendingPoolService(marketData) {
        const provider = this.getProvider(marketData.chainId);
        const LendingPoolBundle = (await import("@aave/contract-helpers"))
            .LendingPoolBundle;
        return new LendingPoolBundle(provider, {
            LENDING_POOL: marketData.addresses.LENDING_POOL,
            WETH_GATEWAY: marketData.addresses.WETH_GATEWAY,
        });
    }
    async getPoolApprovedAmount(marketData, user, token) {
        if (marketData.v3) {
            const pool = await this.getPoolService(marketData);
            return pool.supplyTxBuilder.getApprovedAmount({
                user,
                token,
            });
        }
        else {
            const lendingPool = await this.getLendingPoolService(marketData);
            return lendingPool.depositTxBuilder.getApprovedAmount({ user, token });
        }
    }
    async getApprovedAmount(marketData, user, token, spender) {
        const service = await this.getERC20Service(marketData);
        return service.approvedAmount({
            user,
            token,
            spender,
        });
    }
}
