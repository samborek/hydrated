import { useMemo } from "react";
import { PROVIDERS_BY_WALLET_MODE } from "@/hooks/useWeb3Connect";
import { getWallets } from "@/wallets";
export const useWalletProviders = (mode) => {
    return useMemo(() => {
        const wallets = getWallets();
        const filteredProviders = wallets.filter(({ provider }) => {
            const providers = PROVIDERS_BY_WALLET_MODE[mode];
            return providers.includes(provider);
        });
        const groups = Object.groupBy(filteredProviders, (wallet) => wallet?.installed ? "installed" : "other");
        return {
            installed: groups?.installed || [],
            other: groups?.other || [],
        };
    }, [mode]);
};
