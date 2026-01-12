import { Connection, Keypair, SignatureResult } from "@solana/web3.js";
import { SolanaInjectedWindowProvider } from "@/types/solana";
export type SolanaTxStatus = SignatureResult;
type SolanaSignerOptions = {
    onSubmitted: (txHash: string) => void;
    onSuccess: (status: SignatureResult) => void;
    onError: (error: string) => void;
    onFinalized: (status: SignatureResult) => void;
};
export declare class SolanaSigner {
    address: string;
    provider: SolanaInjectedWindowProvider;
    connection: Connection;
    constructor(address: string, provider: SolanaInjectedWindowProvider);
    getTransactionStatus(hash: string): Promise<import("@solana/web3.js").SignatureStatus>;
    signAndSend(data: string, signers: Keypair[], options: SolanaSignerOptions): Promise<import("@solana/web3.js").SignatureStatus>;
}
export {};
