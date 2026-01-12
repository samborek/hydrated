import { isH160Address, safeConvertAddressSS58 } from "@galacticcouncil/utils";
import { connectInjectedExtension, } from "polkadot-api/pjs-signer";
import { WALLET_DAPP_NAME } from "@/config/wallet";
import { AuthError, NotInstalledError } from "@/utils/errors";
export class BaseSubstrateWallet {
    provider = "";
    accessor = "";
    title = "";
    installUrl = "";
    logo = "";
    _extension;
    _signer;
    _enabled = false;
    get extension() {
        return this._extension;
    }
    get signer() {
        return this._signer;
    }
    get installed() {
        const injectedExtension = window?.injectedWeb3?.[this.accessor];
        return !!injectedExtension;
    }
    get enabled() {
        return this._enabled;
    }
    get rawExtension() {
        return window?.injectedWeb3?.[this.accessor];
    }
    transformError = (err) => {
        if (err.message.includes("pending authorization request")) {
            return new AuthError(err.message, this);
        }
        return err;
    };
    setSigner = (address) => {
        const accounts = this.getInjectedAccounts();
        const account = accounts.find((acc) => safeConvertAddressSS58(acc.address) === safeConvertAddressSS58(address));
        if (account) {
            this._signer = account.polkadotSigner;
        }
    };
    enable = async () => {
        if (!this.installed || !this.rawExtension) {
            throw new NotInstalledError(`Refresh the browser if ${this.title} is already installed.`, this);
        }
        try {
            const rawExtension = await connectInjectedExtension(this.accessor, WALLET_DAPP_NAME);
            if (!rawExtension) {
                throw new NotInstalledError(`${this.title} is installed but could not be enabled. Refresh the browser and try again.`, this);
            }
            const accounts = rawExtension.getAccounts().filter(this.accountFilter);
            if (!accounts.length) {
                throw new AuthError(`${this.title} is installed but no accounts are available. Please check your wallet.`, this);
            }
            const defaultSigner = accounts[0].polkadotSigner;
            this._enabled = true;
            this._extension = rawExtension;
            this._signer = defaultSigner;
        }
        catch (err) {
            throw this.transformError(err);
        }
    };
    getInjectedAccounts = () => {
        if (!this._extension) {
            throw new NotInstalledError(`Refresh the browser if ${this.title} is already installed.`, this);
        }
        return this._extension.getAccounts();
    };
    accountFilter = (account) => {
        return !!account;
    };
    getAccounts = async () => {
        const accounts = this.getInjectedAccounts();
        const accountsWithWallet = accounts.filter(this.accountFilter).map((account) => ({
            address: isH160Address(account.address)
                ? account.address
                : safeConvertAddressSS58(account.address),
            name: account.name ?? "",
            provider: this.provider,
        }));
        return accountsWithWallet;
    };
    subscribeAccounts = (callback) => {
        if (!this._extension) {
            throw new NotInstalledError(`Refresh the browser if ${this.title} is already installed.`, this);
        }
        const unsubscribe = this._extension.subscribe((accounts) => {
            const accountsWithWallet = accounts
                .filter(this.accountFilter)
                .map((account) => {
                return {
                    address: account.address,
                    name: account.name ?? "",
                    provider: this.provider,
                };
            });
            callback(accountsWithWallet);
        });
        return unsubscribe;
    };
    disconnect = () => {
        this._enabled = false;
        this._extension = undefined;
        this._signer = undefined;
    };
}
