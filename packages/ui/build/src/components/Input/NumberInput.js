import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { Input } from "./Input";
export const NumberInput = ({ ref, value, keepInvalidInput, onValueChange, ...props }) => {
    // string input allows to keep invalid values when typing -> e.g. 200 -> 00 -> 300
    const [inputValue, setInputValue] = useState(value?.toString());
    return (_jsx(NumericFormat, { ...(keepInvalidInput
            ? {
                value: inputValue,
                onValueChange: (value, source) => {
                    setInputValue(value.value);
                    onValueChange?.(value, source);
                },
            }
            : {
                value,
                onValueChange,
            }), thousandSeparator: String.fromCharCode(160), getInputRef: ref, customInput: Input, allowedDecimalSeparators: [".", ","], ...props }));
};
