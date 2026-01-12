import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { BookOpen } from "@galacticcouncil/ui/assets/icons";
import { Button, Icon } from "@galacticcouncil/ui/components";
import { getTokenPx } from "@galacticcouncil/ui/utils";
export const AddressBookButton = (props) => {
    return (_jsxs(Button, { variant: "accent", outline: true, size: "small", sx: {
            py: 2,
            px: getTokenPx("scales.paddings.base"),
            textTransform: "uppercase",
        }, ...props, children: [_jsx(Icon, { size: 10, component: BookOpen }), "My contacts"] }));
};
