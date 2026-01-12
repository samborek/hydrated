import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { useState } from "react";
export const Image = ({ src, placeholder, onError, lazy = true, ...props }) => {
    const [hasError, setHasError] = useState(false);
    const handleError = (event) => {
        setHasError(true);
        onError?.(event);
    };
    if (placeholder && (!src || hasError)) {
        return placeholder;
    }
    return (_jsx("img", { ...props, loading: lazy ? "lazy" : "eager", src: src, onError: handleError }));
};
