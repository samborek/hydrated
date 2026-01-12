import { SuiTransactionBlockResponse } from "@mysten/sui/client";
import { WalletAccount, WalletWithRequiredFeatures } from "@mysten/wallet-standard";
export { type SignedTransaction as SuiSignedTransaction } from "@mysten/wallet-standard";
export type SuiTxStatus = SuiTransactionBlockResponse;
type SuiSignerOptions = {
    onSubmitted: (txHash: string) => void;
    onSuccess: (status: SuiTransactionBlockResponse) => void;
    onError: (error: string) => void;
    onFinalized: (status: SuiTransactionBlockResponse) => void;
};
export declare class SuiSigner {
    account: WalletAccount;
    provider: WalletWithRequiredFeatures;
    constructor(account: WalletAccount, provider: WalletWithRequiredFeatures);
    signAndSend(data: string, options: SuiSignerOptions): Promise<SuiTransactionBlockResponse>;
}
