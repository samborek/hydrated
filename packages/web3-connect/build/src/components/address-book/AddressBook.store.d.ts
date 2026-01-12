import { z } from "zod/v4";
import { WalletProviderType } from "@/config/providers";
declare const addressSchema: z.ZodObject<{
    publicKey: z.ZodString;
    name: z.ZodString;
    address: z.ZodString;
    provider: z.ZodEnum<typeof WalletProviderType>;
    isCustom: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type Address = z.infer<typeof addressSchema>;
declare const stateSchema: z.ZodObject<{
    addresses: z.ZodArray<z.ZodObject<{
        publicKey: z.ZodString;
        name: z.ZodString;
        address: z.ZodString;
        provider: z.ZodEnum<typeof WalletProviderType>;
        isCustom: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>>;
}, z.core.$strip>;
type State = z.infer<typeof stateSchema>;
export type AddressStore = State & {
    readonly add: (address: Address | Address[]) => void;
    readonly edit: (address: Address) => void;
    readonly remove: (publicKey: string) => void;
};
export declare const useAddressStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<AddressStore>, "persist"> & {
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<AddressStore, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: AddressStore) => void) => () => void;
        onFinishHydration: (fn: (state: AddressStore) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<AddressStore, unknown>>;
    };
}>;
export {};
