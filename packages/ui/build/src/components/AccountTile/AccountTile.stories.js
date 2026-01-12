import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { AccountTile } from "@/components";
export default {
    component: AccountTile,
};
export const Default = () => {
    return (_jsx(AccountTile, { name: "account-name", address: "0x278b77bb127081cad7beca2d7b863c459a436dd6", value: "$100.21" }));
};
export const Active = () => {
    return (_jsx(AccountTile, { name: "account-name", address: "0x278b77bb127081cad7beca2d7b863c459a436dd6", value: "$100.21", active: true }));
};
