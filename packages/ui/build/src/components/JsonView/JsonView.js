import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import "react18-json-view/src/style.css";
import { safeStringify } from "@galacticcouncil/utils";
import { lazy, Suspense } from "react";
import { Spinner } from "@/components/Spinner";
import { SRoot } from "./JsonView.styled";
const ReactJsonView = lazy(() => import("react18-json-view"));
export const JsonView = ({ fs, className, ref, ...props }) => {
    return (_jsx(SRoot, { ref: ref, className: className, sx: { fontSize: fs }, children: _jsx(Suspense, { fallback: _jsx(JsonViewFallback, { src: props.src }), children: _jsx(ReactJsonView, { collapseStringsAfterLength: 42, enableClipboard: false, ...props }) }) }));
};
export const JsonViewFallback = ({ src, }) => (_jsxs("pre", { children: [safeStringify(src, true), _jsx(Spinner, {})] }));
