import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Input } from "@galacticcouncil/ui/components";
export const AccountNameEdit = ({ name, onChange, onCancel }) => {
    return (_jsx(Input, { autoFocus: true, defaultValue: name, onKeyDown: (e) => {
            if (e.key === "Enter") {
                e.currentTarget.blur();
            }
        }, onBlur: (e) => {
            const value = e.target.value;
            if (isValid(value)) {
                onChange(value);
            }
            else {
                onCancel();
            }
        } }));
};
const isValid = (name) => name.trim().length > 0;
