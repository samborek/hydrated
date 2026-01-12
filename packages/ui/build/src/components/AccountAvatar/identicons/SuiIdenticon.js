import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Flex } from "@/components/Flex";
import { Image } from "@/components/Image";
export const SuiIdenticon = ({ size, ...props }) => (_jsx(Flex, { size: size, borderRadius: "full", align: "center", justify: "center", ...props, children: _jsx(Image, { src: "https://cdn.jsdelivr.net/gh/galacticcouncil/intergalactic-asset-metadata@latest/v2/sui/0x35834a8a/icon.svg", alt: "Solana", width: size, height: size }) }));
