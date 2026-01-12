import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Text } from "@/components/Text";
import { getToken } from "@/utils";
export const FormError = ({ fs = 12, fw = 400, color = getToken("accents.danger.secondary"), ...props }) => {
    return _jsx(Text, { fs: fs, fw: fw, color: color, ...props });
};
