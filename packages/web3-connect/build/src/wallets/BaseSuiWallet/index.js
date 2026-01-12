import { shortenAccountAddress } from "@galacticcouncil/utils";
import { isWalletWithRequiredFeatureSet, } from "@mysten/wallet-standard";
import { SuiSigner } from "@/signers/SuiSigner";
import { NotInstalledError } from "@/utils/errors";
export class BaseSuiWallet {
    provider = "";
    accessor = "";
    title = "";
    installUrl = "";
    logo = "";
    _provider;
    _rawExtension;
    _extension;
    _signer;
    _enabled = false;
    _accounts = [];
    get installed() {
        return !!this._provider && isWalletWithRequiredFeatureSet(this._provider);
    }
    get enabled() {
        return this._enabled;
    }
    get rawExtension() {
        return this._provider;
    }
    get extension() {
        return this._extension;
    }
    get signer() {
        return this._signer;
    }
    transformError = (err) => {
        return new Error(err.message);
    };
    enable = async () => {
        if (!this.installed ||
            !this.rawExtension ||
            !isWalletWithRequiredFeatureSet(this.rawExtension)) {
            throw new NotInstalledError(`Refresh the browser if ${this.title} is already installed.`, this);
        }
        const wallet = this.rawExtension;
        try {
            await wallet.features["standard:connect"].connect();
            this._extension = wallet;
            const { accounts } = wallet;
            if (!accounts.length) {
                throw new Error("No accounts returned from wallet");
            }
            const account = accounts[0];
            const address = account.address;
            this._signer = new SuiSigner(account, wallet);
            this._enabled = true;
            this.setAccounts([
                {
                    address,
                    name: account?.label || shortenAccountAddress(address),
                    provider: this.provider,
                },
            ]);
        }
        catch (err) {
            throw this.transformError(err);
        }
    };
    setAccounts = (accounts) => {
        this._accounts = accounts;
    };
    getAccounts = async () => {
        return this._accounts;
    };
    subscribeAccounts = (_callback) => {
        const extension = this._extension;
        if (!extension) {
            throw new NotInstalledError(`The 'Wallet.enable()' function should be called first.`, this);
        }
        // TODO: Implement proper account subscription for Sui wallets
        // This is a placeholder implementation
        return () => {
            // Unsubscribe logic would go here
        };
    };
    disconnect = () => {
        this._enabled = false;
        this._extension = undefined;
        this._signer = undefined;
        this._accounts = [];
    };
}
