import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { PermissionManager } from "@aave/contract-helpers";
import React, { useContext, useEffect, useState } from "react";
import { useWeb3Context } from "@/libs/hooks/useWeb3Context";
import { isFeatureEnabled } from "@/utils/marketsAndNetworksConfig";
import { getProvider } from "@/utils/provider";
import { useProtocolDataContext } from "./useProtocolDataContext";
const Context = React.createContext({
    permissions: [],
    isPermissionsLoading: false,
});
export const PermissionProvider = ({ children, }) => {
    const { currentChainId: chainId, currentMarketData } = useProtocolDataContext();
    const { currentAccount: walletAddress } = useWeb3Context();
    const [isPermissionsLoading, setIsPermissionsLoading] = useState(true);
    const [permissions, setPermissions] = useState([]);
    async function getPermissionData(permissionManagerAddress) {
        try {
            const instance = new PermissionManager({
                provider: getProvider(chainId),
                permissionManagerAddress: permissionManagerAddress,
            });
            const permissions = await instance.getHumanizedUserPermissions(walletAddress);
            setIsPermissionsLoading(true);
            setPermissions(permissions);
        }
        catch (e) {
            throw new Error("there was an error fetching your permissions");
        }
        setIsPermissionsLoading(false);
    }
    useEffect(() => {
        if (isFeatureEnabled.permissions(currentMarketData) &&
            walletAddress &&
            currentMarketData.addresses.PERMISSION_MANAGER) {
            getPermissionData(currentMarketData.addresses.PERMISSION_MANAGER);
        }
        else {
            setIsPermissionsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [walletAddress, currentMarketData.addresses.PERMISSION_MANAGER]);
    return (_jsx(Context.Provider, { value: {
            permissions,
            isPermissionsLoading,
        }, children: children }));
};
export const usePermissions = () => useContext(Context);
