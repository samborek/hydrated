import { FC, Ref } from "react";
import { NumericFormatProps } from "react-number-format";
import { InputProps } from "./Input";
/**
 * For detailed props documentation
 * @see https://s-yadav.github.io/react-number-format/docs/numeric_format
 */
export type NumberInputProps = NumericFormatProps<InputProps> & {
    ref?: Ref<HTMLInputElement>;
    keepInvalidInput?: boolean;
};
export declare const NumberInput: FC<NumberInputProps>;
