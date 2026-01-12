import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Image } from "@galacticcouncil/ui/components";
export const ProviderLogo = ({ wallet, className, size = 32 }) => {
    return (_jsx(Image, { className: className, src: wallet.logo, alt: wallet.title, sx: { size } }));
};
