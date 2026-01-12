import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Alert, ModalBody, ModalHeader } from "@galacticcouncil/ui/components";
import { pick } from "remeda";
import { useShallow } from "zustand/shallow";
import { useWeb3Connect } from "@/hooks";
export const ErrorContent = () => {
    const { error } = useWeb3Connect(useShallow(pick(["error"])));
    return (_jsxs(_Fragment, { children: [_jsx(ModalHeader, { title: "Connection error", align: "center" }), _jsx(ModalBody, { children: _jsx(Alert, { variant: "error", description: error || "Unknown error, please try again" }) })] }));
};
