import { isH160Address, isSS58Address, updateQueryString, } from "@galacticcouncil/utils";
import { WalletProviderType } from "@/config/providers";
import logo from "./logo.svg";
export class ExternalWallet {
    provider = WalletProviderType.ExternalWallet;
    accessor = "";
    title = "View as wallet";
    installUrl = "";
    logo = logo;
    _rawExtension;
    _extension;
    _signer = {};
    _enabled = false;
    account;
    get extension() {
        return this._extension;
    }
    get signer() {
        return this._signer;
    }
    get installed() {
        return true;
    }
    get enabled() {
        return this._enabled;
    }
    get rawExtension() {
        return this._rawExtension;
    }
    handleAnnounceProvider = () => { };
    enable = async () => {
        this._enabled = true;
        this._extension = {};
    };
    transformError = (err) => {
        return new Error(err.message);
    };
    setAccount = (address) => {
        if (isSS58Address(address) || isH160Address(address)) {
            this.account = {
                address,
                name: "External Account",
                provider: this.provider,
            };
            updateQueryString("address", address);
        }
    };
    getAccounts = async () => {
        return Promise.resolve(this.account ? [this.account] : []);
    };
    subscribeAccounts = () => {
        return () => { };
    };
    disconnect = () => {
        this._enabled = false;
        this.account = undefined;
        updateQueryString("address", undefined);
    };
}
