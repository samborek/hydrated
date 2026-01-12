import { PERMISSION } from "@aave/contract-helpers";
import React from "react";
type PermissionsContext = {
    permissions: PERMISSION[];
    isPermissionsLoading: boolean;
};
export declare const PermissionProvider: React.FC<{
    children?: React.ReactNode;
}>;
export declare const usePermissions: () => PermissionsContext;
export {};
