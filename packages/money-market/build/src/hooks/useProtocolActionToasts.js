import { useMemo } from "react";
import { createProtocolToastFn } from "@/ui-config/toasts";
export const useProtocolActionToasts = (action, params) => {
    const { state, value } = params;
    return useMemo(() => {
        const createToast = createProtocolToastFn(action);
        return createToast({
            state,
            value,
        });
    }, [action, state, value]);
};
