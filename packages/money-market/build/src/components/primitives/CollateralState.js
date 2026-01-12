import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Flex, Text } from "@galacticcouncil/ui/components";
import { getToken } from "@galacticcouncil/ui/utils";
import { CollateralType } from "@/helpers/types";
export const CollateralState = ({ collateralType, }) => {
    return (_jsx(Flex, { inline: true, align: "center", children: {
            [CollateralType.ENABLED]: (_jsx(Text, { fw: 500, color: getToken("accents.success.emphasis"), children: "Enabled" })),
            [CollateralType.ISOLATED_ENABLED]: (_jsx(Text, { fw: 500, color: getToken("accents.alert.primary"), children: "Isolated" })),
            [CollateralType.DISABLED]: (_jsx(Text, { fw: 500, color: getToken("accents.danger.emphasis"), children: "Disabled" })),
            [CollateralType.UNAVAILABLE]: (_jsx(Text, { fw: 500, color: getToken("accents.danger.emphasis"), children: "Unavailable" })),
            [CollateralType.ISOLATED_DISABLED]: (_jsx(Text, { fw: 500, color: getToken("accents.danger.emphasis"), children: "Unavailable" })),
            [CollateralType.UNAVAILABLE_DUE_TO_ISOLATION]: (_jsx(Text, { fw: 500, color: getToken("accents.danger.emphasis"), children: "Unavailable" })),
        }[collateralType] }));
};
