import { type KeyOfType } from "./types";
/**
 * Searches an array of objects for a given search string in specified keys.
 * Key order is important. Result will be ordered by keys order in the array.
 */
export declare function arraySearch<T extends Record<string, unknown>>(array: Array<T>, search?: string, keys?: Array<Extract<KeyOfType<T, string>, string>>): T[];
