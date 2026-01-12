import { useMemo } from "react";
import { pick } from "remeda";
import { useShallow } from "zustand/react/shallow";
import { useWeb3Connect } from "@/hooks/useWeb3Connect";
import { toAccount } from "@/utils";
export const useAccount = () => {
    const { account, accounts, disconnect } = useWeb3Connect(useShallow(pick(["account", "accounts", "disconnect"])));
    return useMemo(() => account
        ? {
            isConnected: true,
            account: toAccount(account),
            accounts: accounts.map(toAccount),
            disconnect,
        }
        : { isConnected: false, account: null, accounts: [], disconnect }, [account, accounts, disconnect]);
};
