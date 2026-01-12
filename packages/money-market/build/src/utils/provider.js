import { useRootStore } from "@/store/root";
export const getProvider = (_chainId) => {
    const { provider } = useRootStore.getState();
    if (!provider)
        throw new Error("Provider not set");
    return provider;
};
