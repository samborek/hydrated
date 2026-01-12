import { Wallet } from "@/types/wallet";
export interface WalletError extends Error {
    readonly wallet: Wallet;
}
export declare class BaseWalletError extends Error implements WalletError {
    name: string;
    readonly wallet: Wallet;
    constructor(message: string, wallet: Wallet);
}
export declare class AuthError extends BaseWalletError {
    readonly name = "AuthError";
}
export declare class NotInstalledError extends BaseWalletError {
    readonly name = "NotInstalledError";
}
