import { chainsMap } from "@galacticcouncil/xc-cfg";
import { SuiChain } from "@galacticcouncil/xc-core";
import { Transaction } from "@mysten/sui/transactions";
export class SuiSigner {
    account;
    provider;
    constructor(account, provider) {
        this.account = account;
        this.provider = provider;
    }
    async signAndSend(data, options) {
        const chain = chainsMap.get("sui");
        if (!(chain instanceof SuiChain)) {
            throw new Error("Unsupported chain");
        }
        const transaction = Transaction.from(data);
        const params = {
            transaction,
            account: this.account,
            chain: "sui:mainnet",
        };
        const wallet = this.provider.features["sui:signTransaction"];
        if (!wallet) {
            throw new Error("Wallet does not support sui:signTransaction feature.");
        }
        try {
            const { bytes, signature } = await wallet.signTransaction(params);
            const { digest: txHash } = await chain.client.executeTransactionBlock({
                transactionBlock: bytes,
                signature,
                options: {
                    showEffects: true,
                    showEvents: true,
                    showObjectChanges: true,
                    showBalanceChanges: true,
                },
            });
            options.onSubmitted(txHash);
            const block = await chain.client.getTransactionBlock({
                digest: txHash,
                options: {
                    showEffects: true,
                    showEvents: true,
                    showObjectChanges: true,
                    showBalanceChanges: true,
                },
            });
            const isSuccess = block.effects?.status.status === "success";
            if (isSuccess) {
                options.onSuccess(block);
            }
            else {
                options.onError(block.effects?.status.error ?? "Unknown SUI error");
            }
            options.onFinalized(block);
            return block;
        }
        catch (error) {
            options.onError(error instanceof Error ? error.message : "Error signing transaction");
            throw error;
        }
    }
}
