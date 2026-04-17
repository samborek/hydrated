import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { useCopy } from "@galacticcouncil/utils";
import { CheckIcon, CopyIcon } from "@/assets/icons";
import { Icon } from "../Icon";
export const CopyButton = ({ text, delay = 5000, defaultIcon = CopyIcon, copiedIcon = CheckIcon, iconSize = 14, children, ...props }) => {
    const { copied, copy } = useCopy(delay);
    return (_jsx("button", { type: "button", ...props, disabled: copied, "data-copied": copied, onClick: (e) => {
            e.stopPropagation();
            copy(text);
        }, children: children ? (children({ copied })) : (_jsx(Icon, { size: iconSize, component: copied ? copiedIcon : defaultIcon })) }));
};
