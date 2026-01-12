import { ExtendedEvmCall } from "@galacticcouncil/money-market/types";
import { Chain, EIP1193Provider, EstimateGasParameters, parseSignature, PublicClient, TransactionReceipt, WalletClient } from "viem";
type PermitMessage = {
    from: string;
    to: string;
    value: number;
    data: string;
    gaslimit: number;
    nonce: number;
    deadline: number;
};
export type PermitResult = {
    signature: ReturnType<typeof parseSignature>;
    message: PermitMessage;
};
type TransactionCall = Omit<ExtendedEvmCall, "from" | "type" | "dryRun">;
type EthereumSignerOptions = {
    chainKey?: string;
    weight?: bigint;
    onSubmitted: (txHash: string) => void;
    onSuccess: (receipt: TransactionReceipt) => void;
    onError: (error: string) => void;
    onFinalized: (receipt: TransactionReceipt) => void;
};
export declare class EthereumSigner {
    address: string;
    provider: EIP1193Provider;
    publicClient: PublicClient;
    walletClient: WalletClient;
    constructor(address: string, provider: EIP1193Provider);
    formatError: (err: unknown) => string;
    estimateGas(tx: EstimateGasParameters, weight?: bigint): Promise<{
        gas: bigint;
        gasLimit: bigint;
        gasPrice: bigint;
        maxPriorityFeePerGas: bigint;
        maxFeePerGas: bigint;
    }>;
    switchChain: (options: EthereumSignerOptions) => Promise<import("@galacticcouncil/xc-core").AnyEvmChain>;
    signAndSubmitDispatch(call: Omit<TransactionCall, "to">, options: EthereumSignerOptions): Promise<TransactionReceipt | undefined>;
    getPermitNonce: () => Promise<bigint>;
    getPermit: (data: string, options: EthereumSignerOptions) => Promise<PermitResult>;
    signAndSubmitHydration(call: TransactionCall, options: EthereumSignerOptions, chain: Chain): Promise<TransactionReceipt | undefined>;
    signAndSubmitNative(call: TransactionCall, options: EthereumSignerOptions, chain: Chain): Promise<TransactionReceipt | undefined>;
    signAndSubmit(call: TransactionCall, options: EthereumSignerOptions): Promise<TransactionReceipt | undefined>;
}
export {};
