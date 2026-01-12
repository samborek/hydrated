import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { useTranslation } from "react-i18next";
import { SContainer, SProgressBar, SProgressBarFill, SProgressBarLabel, } from "@/components/ProgressBar/ProgressBar.styled";
export const ProgressBar = ({ value, size = "medium", customLabel, format, orientation = "horizontal", hideLabel, className, color, }) => {
    const { t } = useTranslation();
    const clippedValue = Math.max(0, Math.min(100, value));
    const formattedValue = format?.(clippedValue) ?? t("percent", { clippedValue });
    return (_jsxs(SContainer, { size: size, orientation: orientation, className: className, children: [_jsx(SProgressBar, { children: _jsx(SProgressBarFill, { value: clippedValue, sx: { backgroundColor: color } }) }), !hideLabel && (_jsx(SProgressBarLabel, { children: customLabel ?? formattedValue }))] }));
};
