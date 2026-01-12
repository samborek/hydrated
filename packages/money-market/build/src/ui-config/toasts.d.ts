import { ProtocolAction } from "@aave/contract-helpers";
import { ToastsConfig } from "@/types";
export type ToastFnParams = {
    value: string;
    state?: "on" | "off";
};
type CreateToastsFn = (params: ToastFnParams) => ToastsConfig;
export declare const TOAST_MESSAGES: Record<ProtocolAction, CreateToastsFn>;
export declare const createProtocolToastFn: (action: ProtocolAction) => CreateToastsFn;
export {};
