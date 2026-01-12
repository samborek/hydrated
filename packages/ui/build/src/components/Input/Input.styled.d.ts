export type CustomInputProps = {
    customSize?: "small" | "medium" | "large";
    variant?: "embedded" | "standalone";
    isError?: boolean;
    isFullWidth?: boolean;
    disabled?: boolean;
};
export declare const SInputContainer: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
} & Pick<CustomInputProps, "variant" | "customSize">, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const SInput: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
} & CustomInputProps, import("react").DetailedHTMLProps<import("react").InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, {}>;
