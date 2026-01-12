import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { PiIcon } from "lucide-react";
import { Chain } from "./Chain";
export default {
    component: Chain,
};
export const Desktop = () => {
    return _jsx(Chain, { icon: PiIcon, name: "Ethereum" });
};
export const Mobile = () => {
    return _jsx(Chain, { icon: PiIcon, name: "Ethereum", variant: "mobile" });
};
