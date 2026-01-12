import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { EditIcon } from "@galacticcouncil/ui/assets/icons";
import { Icon } from "@galacticcouncil/ui/components";
import { getToken } from "@galacticcouncil/ui/utils";
export const AccountEditButton = ({ onClick, ...props }) => {
    return (_jsx("button", { sx: {
            cursor: "pointer",
            color: getToken("text.medium"),
            "&:hover": {
                color: getToken("text.high"),
            },
        }, type: "button", onClick: (e) => {
            e.stopPropagation();
            onClick?.(e);
        }, ...props, children: _jsx(Icon, { size: 14, component: EditIcon }) }));
};
