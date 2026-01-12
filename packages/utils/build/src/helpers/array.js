import { isArray, isString } from "remeda";
function tokenize(str) {
    if (!isString(str))
        return [];
    return str.split(/[\s\-._]+/);
}
function normalize(str) {
    if (!isString(str))
        return "";
    return (str
        .toLowerCase()
        .trim()
        // remove diacritics
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""));
}
/**
 * Searches an array of objects for a given search string in specified keys.
 * Key order is important. Result will be ordered by keys order in the array.
 */
export function arraySearch(array, search = "", keys) {
    if (!isArray(array))
        return [];
    return array
        .reduce((memo, item) => {
        const searchableKeys = keys || Object.keys(item).filter((key) => typeof item[key] === "string");
        searchableKeys.some((key, index) => {
            const normalizedSearch = normalize(search);
            const tokens = tokenize(normalizedSearch);
            if (!item[key])
                return false;
            const values = tokenize(normalize(item[key].toString()));
            return values.some((value) => {
                if (tokens.some((token) => value.includes(token))) {
                    memo[index] ? memo[index].push(item) : (memo[index] = [item]);
                    return true;
                }
                return false;
            });
        });
        return memo;
    }, [])
        .flat();
}
