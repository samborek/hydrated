import * as DialogPrimitive from "@radix-ui/react-dialog";
import { FC, Ref } from "react";
import { BoxProps } from "@/components/Box";
import { FlexProps } from "@/components/Flex";
declare const SheetRoot: FC<DialogPrimitive.DialogProps>;
declare const SheetTrigger: import("react").ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & import("react").RefAttributes<HTMLButtonElement>>;
declare const SheetPortal: FC<DialogPrimitive.DialogPortalProps>;
declare const SheetCloseTrigger: import("react").ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & import("react").RefAttributes<HTMLButtonElement>>;
declare const SheetClose: FC<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>>;
declare const SheetOverlay: FC<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & {
    ref?: Ref<React.ElementRef<typeof DialogPrimitive.Overlay>>;
}>;
declare const SheetContent: FC<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    ref?: Ref<React.ElementRef<typeof DialogPrimitive.Content>>;
}>;
declare const SheetTitle: FC<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> & {
    ref?: Ref<React.ElementRef<typeof DialogPrimitive.Title>>;
}>;
type SheetHeaderProps = Omit<FlexProps, "title"> & {
    title?: string;
};
declare const SheetHeader: FC<SheetHeaderProps>;
type SheetBodyProps = BoxProps & {
    scrollable?: boolean;
};
declare const SheetBody: ({ scrollable, children, maxHeight, ...props }: SheetBodyProps) => import("react").JSX.Element;
export type SheetProps = React.ComponentProps<typeof SheetRoot> & {
    title?: string;
    disableInteractOutside?: boolean;
};
declare const Sheet: ({ title, disableInteractOutside, children, ...props }: SheetProps) => import("react").JSX.Element;
export { Sheet, SheetBody, SheetClose, SheetCloseTrigger, SheetContent, SheetHeader, SheetOverlay, SheetPortal, SheetRoot, SheetTitle, SheetTrigger, };
