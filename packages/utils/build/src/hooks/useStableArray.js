import { useMemo } from "react";
export const useStableArray = (arr) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useMemo(() => arr, [arr.join(",")]);
};
