import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { UserIcon } from "lucide-react";
import { Flex } from "@/components/Flex";
import { Icon } from "@/components/Icon";
import { getToken } from "@/utils";
export const EmptyIdenticon = ({ size, ...props }) => (_jsx(Flex, { size: size, bg: getToken("controls.dim.accent"), borderRadius: "full", align: "center", justify: "center", ...props, children: _jsx(Icon, { sx: { width: "60%", height: "60%" }, component: UserIcon, color: getToken("text.low") }) }));
