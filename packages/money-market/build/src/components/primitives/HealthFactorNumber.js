import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Flex, Text } from "@galacticcouncil/ui/components";
import { getToken } from "@galacticcouncil/ui/utils";
import { useFormattedHealthFactor } from "@/hooks";
export const HealthFactorNumber = ({ value, fontSize = 14, }) => {
    const { healthFactor, healthFactorColor } = useFormattedHealthFactor(value);
    return (_jsx(Flex, { children: value === "-1" ? (_jsx(Text, { fw: 500, fs: fontSize, color: getToken("accents.success.emphasis"), sx: { scale: "1.3" }, children: "\u221E" })) : (_jsx(Text, { fw: 700, fs: fontSize, sx: { color: healthFactorColor }, children: healthFactor })) }));
};
