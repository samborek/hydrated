export var WalletType;
(function (WalletType) {
    WalletType["INJECTED"] = "injected";
    WalletType["WALLET_CONNECT"] = "wallet_connect";
    WalletType["WALLET_LINK"] = "wallet_link";
    WalletType["TORUS"] = "torus";
    WalletType["FRAME"] = "frame";
    WalletType["GNOSIS"] = "gnosis";
    WalletType["LEDGER"] = "ledger";
    WalletType["READ_ONLY_MODE"] = "read_only_mode";
})(WalletType || (WalletType = {}));
export var ApprovalMethod;
(function (ApprovalMethod) {
    ApprovalMethod["APPROVE"] = "Transaction";
    ApprovalMethod["PERMIT"] = "Signed message";
})(ApprovalMethod || (ApprovalMethod = {}));
const getWalletPreferences = () => {
    const walletPreference = localStorage.getItem("walletApprovalPreferences");
    if (walletPreference) {
        return JSON.parse(walletPreference);
    }
    else {
        return {};
    }
};
export const createWalletSlice = (set, get) => ({
    account: "",
    accountLoading: false,
    walletType: undefined,
    setWalletType(walletType) {
        set({ walletType });
    },
    setAccount(account) {
        set({ account: account || "", isWalletModalOpen: false });
        const refresh = get().refreshWalletApprovalMethod;
        refresh();
    },
    setAccountLoading(loading) {
        set({ accountLoading: loading });
    },
    isWalletModalOpen: false,
    setWalletModalOpen(open) {
        set({ isWalletModalOpen: open });
    },
    walletApprovalMethodPreference: ApprovalMethod.PERMIT,
    setWalletApprovalMethodPreference: (method) => {
        const account = get().account;
        if (account !== "") {
            const walletPreferencesObject = getWalletPreferences();
            walletPreferencesObject[account.toLowerCase()] = method;
            localStorage.setItem("walletApprovalPreferences", JSON.stringify(walletPreferencesObject));
            set(() => ({
                walletApprovalMethodPreference: method,
            }));
        }
    },
    refreshWalletApprovalMethod: () => {
        const account = get().account;
        if (account !== "") {
            const walletPreferencesObject = getWalletPreferences();
            const accountPreference = walletPreferencesObject[account.toLowerCase()];
            set(() => ({
                walletApprovalMethodPreference: accountPreference
                    ? accountPreference
                    : ApprovalMethod.PERMIT,
            }));
        }
    },
});
