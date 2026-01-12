import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { useState } from "react";
import { Notification } from "./Notification";
export default {
    component: Notification,
};
const Template = (args) => {
    // remount on iteration change to reset progress animation
    const [i, setIteration] = useState(0);
    return (_jsx(Notification, { ...args, onClose: () => setIteration((i) => i + 1), content: "Transaction has been submitted", dateString: "2 minutes ago" }, i));
};
export const Success = {
    render: Template,
    args: { variant: "success" },
};
export const Pending = {
    render: Template,
    args: { variant: "pending" },
};
export const Error = {
    render: Template,
    args: { variant: "error" },
};
export const Warning = {
    render: Template,
    args: { variant: "warning" },
};
export const Submitted = {
    render: Template,
    args: { variant: "submitted" },
};
export const Unknown = {
    render: Template,
    args: { variant: "unknown" },
};
