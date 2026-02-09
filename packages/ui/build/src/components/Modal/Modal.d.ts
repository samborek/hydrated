import * as DialogPrimitive from "@radix-ui/react-dialog";
import { FC, ReactNode, Ref } from "react";
import { BoxProps } from "@/components/Box";
import { FlexProps } from "@/components/Flex";
export type ModalVariant = "auto" | "drawer" | "popup";
declare const ModalRoot: FC<DialogPrimitive.DialogProps>;
declare const ModalTrigger: import("react").ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & import("react").RefAttributes<HTMLButtonElement>>;
declare const ModalPortal: FC<DialogPrimitive.DialogPortalProps>;
declare const ModalCloseTrigger: import("react").ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & import("react").RefAttributes<HTMLButtonElement>>;
type ModalOverlayProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & {
    ref?: Ref<React.ElementRef<typeof DialogPrimitive.Overlay>>;
};
declare const ModalOverlay: FC<ModalOverlayProps & {
    animationDurationMs?: number;
}>;
type ModalContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    ref?: Ref<React.ElementRef<typeof DialogPrimitive.Content>>;
    topContent?: ReactNode;
    animationDurationMs?: number;
};
declare const ModalContent: FC<ModalContentProps>;
type ModalTitleProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> & {
    ref?: Ref<React.ElementRef<typeof DialogPrimitive.Title>>;
};
declare const ModalTitle: FC<ModalTitleProps>;
type ModalDescriptionProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> & {
    ref?: Ref<React.ElementRef<typeof DialogPrimitive.Description>>;
};
declare const ModalDescription: FC<ModalDescriptionProps>;
type ModalHeaderProps = Omit<FlexProps, "title"> & {
    title: string;
    description?: string;
    customDescription?: ReactNode;
    align?: "default" | "center";
    customHeader?: ReactNode;
    customTitle?: ReactNode;
    onBack?: () => void;
    closable?: boolean;
};
type ModalCloseProps = React.ComponentProps<typeof DialogPrimitive.Close>;
declare const ModalClose: FC<ModalCloseProps>;
declare const ModalHeader: FC<ModalHeaderProps>;
type ModalBodyProps = BoxProps & {
    scrollable?: boolean;
    noPadding?: boolean;
};
declare const ModalBody: ({ scrollable, children, maxHeight, ...props }: ModalBodyProps) => import("react").JSX.Element;
declare const ModalFooter: (props: FlexProps) => import("react").JSX.Element;
export type ModalProps = React.ComponentProps<typeof ModalRoot> & {
    className?: string;
    variant?: ModalVariant;
    disableInteractOutside?: boolean;
    topContent?: ReactNode;
    animationDurationMs?: number;
};
declare const Modal: ({ children, variant, disableInteractOutside, topContent, animationDurationMs, ...props }: ModalProps) => import("react").JSX.Element;
declare const ModalContainer: ({ children, className, ...props }: React.ComponentProps<typeof ModalRoot> & {
    className?: string;
}) => import("react").JSX.Element;
declare const ModalContentDivider: import("@emotion/styled").StyledComponent<Omit<Omit<import("@radix-ui/react-separator").SeparatorProps & import("react").RefAttributes<HTMLDivElement>, "ref">, "orientation"> & Partial<Pick<import("@theme-ui/css").ThemeUICSSProperties, "px" | "transform" | "size" | "m" | "borderRadius" | "alignContent" | "alignItems" | "bottom" | "display" | "height" | "left" | "maxHeight" | "maxWidth" | "minWidth" | "position" | "right" | "top" | "visibility" | "width" | "borderStyle" | "borderWidth" | "flex" | "gap" | "gridColumn" | "gridRow" | "mt" | "mr" | "mb" | "ml" | "mx" | "my" | "p" | "pt" | "pr" | "pb" | "pl" | "py">> & {
    asChild?: boolean;
    as?: React.ElementType;
    css?: import("@emotion/serialize").Interpolation<unknown>;
    sx?: import("@theme-ui/css").ThemeUIStyleObject<import("@theme-ui/core").Theme>;
    children?: React.ReactNode;
    color?: import("@/theme").ThemeColor | import("@theme-ui/css").ThemeUICSSProperties["color"];
    bg?: import("@/theme").ThemeColor | import("@theme-ui/css").ThemeUICSSProperties["backgroundColor"];
    borderColor?: import("@/theme").ThemeColor | import("@theme-ui/css").ThemeUICSSProperties["borderColor"];
} & Omit<import("react").HTMLAttributes<HTMLElement>, "color"> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    size?: number;
    orientation?: import("@theme-ui/css").ResponsiveStyleValue<"horizontal" | "vertical">;
} & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
export { Modal, ModalBody, ModalClose, ModalCloseTrigger, ModalContainer, ModalContent, ModalContentDivider, ModalDescription, ModalFooter, ModalHeader, ModalOverlay, ModalPortal, ModalRoot, ModalTitle, ModalTrigger, };
