import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Chip } from "../../Chip";
export const PriceIndicator = ({ ref, ...props }) => {
    return (_jsx(Chip, { ref: ref, variant: "tertiary", rounded: true, sx: { position: "absolute", zIndex: 2, fontWeight: 600, lineHeight: 1.4 }, ...props }));
};
