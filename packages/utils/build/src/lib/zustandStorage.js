import { z } from "zod/v4";
import { createJSONStorage } from "zustand/middleware";
export const createZustandStorage = (version, stateSchema, defaultState, previousVersion) => {
    const versionedStateSchema = z.object({
        version: z.literal(version),
        state: stateSchema,
    });
    const versionedStateSchemaPrevious = previousVersion
        ? z.object({
            version: z.literal(version - 1),
            state: previousVersion.previousStateSchema,
        })
        : null;
    return createJSONStorage(() => ({
        getItem: async (name) => {
            const data = window.localStorage.getItem(name);
            if (data) {
                try {
                    const parsedData = JSON.parse(data);
                    const validatedData = versionedStateSchema.safeParse(parsedData);
                    if (validatedData.success) {
                        return JSON.stringify(validatedData.data);
                    }
                    if (versionedStateSchemaPrevious) {
                        const validatedDataPrevious = versionedStateSchemaPrevious.safeParse(parsedData);
                        if (validatedDataPrevious.success && previousVersion) {
                            return JSON.stringify({
                                state: previousVersion.migrate(validatedDataPrevious.data.state),
                                version,
                            });
                        }
                    }
                    return JSON.stringify({
                        state: defaultState,
                        version,
                    });
                }
                catch (err) {
                    console.error(err);
                }
            }
            return JSON.stringify({
                state: defaultState,
                version,
            });
        },
        setItem(name, value) {
            window.localStorage.setItem(name, value);
        },
        removeItem(name) {
            window.localStorage.removeItem(name);
        },
    }));
};
