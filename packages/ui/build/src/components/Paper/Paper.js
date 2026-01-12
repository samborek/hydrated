import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { SPaper } from "@/components/Paper/Paper.styled";
export const Paper = ({ borderRadius = "xl", ref, ...props }) => {
    return _jsx(SPaper, { ref: ref, borderRadius: borderRadius, ...props });
};
