import { type infer as Infer } from "zod/v4";
export type ExternalWalletFormValues = Infer<typeof schema>;
declare const schema: import("zod/v4").ZodObject<{
    address: import("zod/v4").ZodString;
}, import("zod/v4/core").$strip>;
export declare const useExternalWalletForm: () => import("react-hook-form").UseFormReturn<{
    address: string;
}, any, {
    address: string;
}>;
export {};
