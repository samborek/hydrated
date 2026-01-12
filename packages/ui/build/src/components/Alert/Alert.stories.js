import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Alert } from "./Alert";
export default {
    component: Alert,
};
export const Info = () => {
    return _jsx(Alert, { variant: "info", description: "This is an info message" });
};
export const WithTitle = () => {
    return (_jsx(Alert, { variant: "info", title: "Info", description: "This is an info message" }));
};
export const Error = () => {
    return _jsx(Alert, { variant: "error", description: "This is an error message" });
};
export const Warning = () => {
    return _jsx(Alert, { variant: "warning", description: "This is a warning message" });
};
