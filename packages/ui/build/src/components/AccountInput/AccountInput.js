import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { ArrowDownToLine } from "lucide-react";
import { Close } from "@/assets/icons";
import { AccountAvatar, ButtonIcon, Flex, Grid, Icon, Input, } from "@/components";
import { getTokenPx } from "@/utils";
export const AccountInput = ({ value, onChange, avatarTheme = "auto", className, ref, ...props }) => {
    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            onChange(text);
        }
        catch (error) {
            console.warn("Failed to read clipboard:", error);
        }
    };
    const handleClear = () => {
        onChange("");
    };
    return (_jsxs(Grid, { columnTemplate: "1fr auto", align: "center", columnGap: 10, className: className, children: [_jsxs(Flex, { align: "center", gap: getTokenPx("containers.paddings.quart"), children: [_jsx(AccountAvatar, { address: value, theme: avatarTheme }), _jsx(Input, { ref: ref, variant: "embedded", value: value, onChange: (e) => onChange(e.target.value), sx: { p: 0, flex: 1 }, ...props })] }), !value ? (_jsx(ButtonIcon, { onClick: handlePaste, children: _jsx(Icon, { component: ArrowDownToLine, size: 18 }) })) : (_jsx(ButtonIcon, { onClick: handleClear, children: _jsx(Icon, { component: Close, size: 18 }) }))] }));
};
