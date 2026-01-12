import { useEffect, useState } from "react";
import { Web3ConnectModalPage } from "@/config/modal";
import { useWeb3Connect, WalletProviderStatus, } from "@/hooks/useWeb3Connect";
const getInitialPage = (mode) => {
    const { getConnectedProviders } = useWeb3Connect.getState();
    const connectedProviders = getConnectedProviders(mode);
    if (connectedProviders.length > 0) {
        return Web3ConnectModalPage.AccountSelect;
    }
    return Web3ConnectModalPage.ProviderSelect;
};
export const useWeb3ConnectInit = ({ mode }) => {
    const [page, setPage] = useState(() => getInitialPage(mode));
    useEffect(() => {
        return useWeb3Connect.subscribe(({ recentProvider, error, getStatus }) => {
            const status = getStatus(recentProvider);
            const isConnected = status === WalletProviderStatus.Connected;
            const isDisconnected = status === WalletProviderStatus.Disconnected;
            const isPending = status === WalletProviderStatus.Pending;
            const isError = status === WalletProviderStatus.Error;
            if (isError && error) {
                return setPage(Web3ConnectModalPage.Error);
            }
            if (isConnected || isPending) {
                return setPage(Web3ConnectModalPage.AccountSelect);
            }
            if (isDisconnected) {
                return setPage(Web3ConnectModalPage.ProviderSelect);
            }
        });
    }, [setPage]);
    return { page, setPage };
};
