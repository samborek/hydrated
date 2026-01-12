import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { LoaderCircle } from "lucide-react";
import { getToken } from "@/utils";
export const Spinner = ({ size, ...props }) => {
    return (_jsx(LoaderCircle, { ...props, sx: {
            size,
            animationName: getToken("animations.rotate"),
            animationDuration: "0.8s",
            animationIterationCount: "infinite",
            animationTimingFunction: "linear",
        } }));
};
