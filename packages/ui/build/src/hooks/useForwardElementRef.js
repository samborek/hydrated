import { useCallback, useRef } from "react";
/*
 * Use when you need to access element ref that is attaching to a parent ref
 */
export const useForwardElementRef = (parentRef) => {
    const ref = useRef(null);
    return [
        ref,
        useCallback((element) => {
            ref.current = element;
            if (typeof parentRef === "function") {
                parentRef(element);
            }
            else if (parentRef) {
                parentRef.current = element;
            }
        }, [parentRef]),
    ];
};
