import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { QuestionCircleRegular } from "@/assets/icons";
import { SLogo, SLogoPlaceholder } from "./Logo.styled";
export const Logo = ({ size = "medium", ...props }) => (_jsx(SLogo, { size: size, ...props, placeholder: _jsx(SLogoPlaceholder, { component: QuestionCircleRegular, size: size }) }));
