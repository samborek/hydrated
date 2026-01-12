import { FlexProps } from "@/components/Flex";
import { TextProps } from "@/components/Text";
export declare const FormLabel: React.FC<TextProps>;
export declare const FormError: React.FC<TextProps>;
export type FormFieldProps = {
    label?: string;
    error?: string;
    children: React.ReactNode;
} & FlexProps;
export declare const FormField: React.FC<FormFieldProps>;
