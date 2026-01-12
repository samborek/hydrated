import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { ProgressBar } from "@/components/ProgressBar/ProgressBar";
export default {
    title: "components/ProgressBar",
};
export const ProgressBarSmall = () => {
    return _jsx(ProgressBar, { size: "small", value: 15 });
};
export const ProgressBarLarge = () => {
    return _jsx(ProgressBar, { size: "large", value: 15 });
};
