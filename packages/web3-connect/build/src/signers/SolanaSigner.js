import { chainsMap } from "@galacticcouncil/xc-cfg";
import { MessageV0, VersionedTransaction, } from "@solana/web3.js";
import waitFor from "p-wait-for";
export class SolanaSigner {
    address;
    provider;
    connection;
    constructor(address, provider) {
        this.address = address;
        this.provider = provider;
        this.connection = chainsMap.get("solana").connection;
    }
    async getTransactionStatus(hash) {
        return waitFor(async () => {
            const { value } = await this.connection.getSignatureStatus(hash, {
                searchTransactionHistory: true,
            });
            const isError = !!value?.err;
            const condition = isError ||
                value?.confirmationStatus === "confirmed" ||
                value?.confirmationStatus === "finalized";
            return condition && waitFor.resolveWith(value);
        }, {
            interval: 5000,
            timeout: 60000,
        });
    }
    async signAndSend(data, signers, options) {
        const mssgBuffer = Buffer.from(data, "hex");
        const mssgArray = Uint8Array.from(mssgBuffer);
        const mssgV0 = MessageV0.deserialize(mssgArray);
        const versioned = new VersionedTransaction(mssgV0);
        await this.provider.connect();
        versioned.sign(signers);
        try {
            const { signature } = await this.provider.signAndSendTransaction(versioned);
            options.onSubmitted(signature);
            const status = await this.getTransactionStatus(signature);
            if (status?.err) {
                options.onError(status.err.toString());
            }
            else {
                options.onSuccess(status);
            }
            options.onFinalized(status);
            return status;
        }
        catch (error) {
            options.onError(error instanceof Error ? error.message : "Error signing transaction");
            throw error;
        }
    }
}
