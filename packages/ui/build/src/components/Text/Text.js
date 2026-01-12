import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Box } from "@/components";
import { getToken } from "@/utils";
export const getFontSizeProps = (fs) => {
    if (typeof fs === "string") {
        return { variant: `typography.text.size.${fs}` };
    }
    return { fontSize: fs };
};
const getTruncateProps = (truncate) => ({
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    maxWidth: typeof truncate === "boolean" ? undefined : truncate,
});
export const Text = ({ as = "p", fs, lh, fw, align, transform, decoration, whiteSpace, font = "secondary", truncate, wordBreak, ref, ...props }) => {
    return (_jsx(Box, { as: as, ref: ref, sx: {
            fontFamily: font === "mono" ? "GeistMono" : getToken(`fontFamilies1.${font}`),
            fontWeight: fw,
            textAlign: align,
            textTransform: transform,
            textDecoration: decoration,
            lineHeight: lh,
            whiteSpace,
            wordBreak,
            ...getFontSizeProps(fs),
            ...(truncate && getTruncateProps(truncate)),
        }, ...props }));
};
