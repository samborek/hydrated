import { createContext, useContext } from "react";
const Web3ConnectContext = createContext(null);
export const Web3ConnectProvider = Web3ConnectContext.Provider;
export const useWeb3ConnectContext = () => {
    const context = useContext(Web3ConnectContext);
    if (!context) {
        throw new Error("useWeb3ConnectContext must be used within a Web3ConnectProvider");
    }
    return context;
};
