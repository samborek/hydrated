export declare enum ErrorType {
    EMODE_DISABLED_LIQUIDATION = 0,
    CLOSE_POSITIONS_BEFORE_SWITCHING = 1,
    CLOSE_POSITIONS_BEFORE_DISABLING = 2
}
export declare enum EmodeModalType {
    ENABLE = "Enable",
    DISABLE = "Disable",
    SWITCH = "Manage"
}
export interface EmodeModalContentProps {
    mode: EmodeModalType;
}
export declare const EmodeModalContent: ({ mode }: EmodeModalContentProps) => import("react").JSX.Element;
