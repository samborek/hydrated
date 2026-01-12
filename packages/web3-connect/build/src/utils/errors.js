export class BaseWalletError extends Error {
    name = "WalletError";
    wallet;
    constructor(message, wallet) {
        super(message);
        this.wallet = wallet;
    }
}
export class AuthError extends BaseWalletError {
    name = "AuthError";
}
export class NotInstalledError extends BaseWalletError {
    name = "NotInstalledError";
}
