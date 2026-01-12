import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { Flex } from "@/components/Flex";
export const EthereumIdenticon = ({ address, size, ...props }) => (_jsx(Flex, { ...props, children: _jsx(Jazzicon, { diameter: size, seed: jsNumberForAddress(address) }) }));
