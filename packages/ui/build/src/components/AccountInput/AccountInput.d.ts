import { type AccountAvatarTheme } from "../AccountAvatar";
export type AccountInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
    value: string;
    onChange: (value: string) => void;
    avatarTheme?: AccountAvatarTheme;
    isError?: boolean;
    className?: string;
    ref?: React.Ref<HTMLInputElement>;
};
export declare const AccountInput: React.FC<AccountInputProps>;
