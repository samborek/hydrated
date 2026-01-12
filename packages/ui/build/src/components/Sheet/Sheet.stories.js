import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Fragment } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { useState } from "@storybook/preview-api";
import { Button } from "@/components/Button";
import { Flex } from "@/components/Flex";
import { Notification } from "@/components/Notification";
import { getToken } from "@/utils";
import { Sheet } from "./Sheet";
export default {
    component: Sheet,
};
const DefaultTemplate = (args) => {
    const [open, setOpen] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: () => setOpen(true), children: "Open Sheet" }), _jsx(Sheet, { title: "Notifications", ...args, open: open, onOpenChange: setOpen, children: _jsx(Flex, { direction: "column", gap: 10, children: Array.from({ length: 10 }).map((_, i) => (_jsxs(Fragment, { children: [_jsx(Notification, { sx: {
                                    width: "100%",
                                    bg: getToken("surfaces.containers.dim.dimOnBg"),
                                }, autoClose: false, variant: "success", content: "Transaction sucessful" }), _jsx(Notification, { sx: {
                                    width: "100%",
                                    bg: getToken("surfaces.containers.dim.dimOnBg"),
                                }, autoClose: false, variant: "error", content: "Transaction failed" }), _jsx(Notification, { sx: {
                                    width: "100%",
                                    bg: getToken("surfaces.containers.dim.dimOnBg"),
                                }, autoClose: false, variant: "unknown", content: "Transaction pending" })] }, i))) }) })] }));
};
export const Default = {
    render: DefaultTemplate,
};
