import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { useTranslation } from "react-i18next";
import { SChainContainer } from "@/components/Chain/Chain.styled";
import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { getToken, px } from "@/utils";
export const Chain = ({ icon, name, className, onClick, variant, isActive, }) => {
    const { t } = useTranslation();
    return (_jsxs(SChainContainer, { tabIndex: 0, className: className, variant: variant, onClick: onClick, isActive: isActive, children: [_jsx(Icon, { component: icon }), _jsxs("div", { children: [_jsx(Text, { fw: 500, fs: 12, lh: 1.1, color: getToken("text.high"), children: name }), _jsx(Text, { fw: 500, fs: 10, lh: px(12), color: getToken("text.medium"), children: isActive ? t("connected") : t("connect") })] })] }));
};
