import { z } from "zod/v4";
type PreviousVersionProps<TOldSchema extends z.ZodSchema, TNewSchema extends z.ZodSchema> = {
    previousStateSchema: TOldSchema;
    migrate: (previousState: z.infer<TOldSchema>) => z.infer<TNewSchema>;
};
export declare const createZustandStorage: <TSchema extends z.ZodSchema, TPreviousSchema extends z.ZodSchema = TSchema>(version: number, stateSchema: TSchema, defaultState: z.infer<TSchema>, previousVersion?: PreviousVersionProps<TPreviousSchema, TSchema>) => import("zustand/middleware").PersistStorage<unknown, unknown> | undefined;
export {};
