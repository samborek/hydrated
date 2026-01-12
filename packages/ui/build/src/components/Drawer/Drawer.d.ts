import { FC, ReactNode, Ref } from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { FlexProps } from "@/components/Flex";
declare const DrawerRoot: typeof import("vaul").Root;
declare const DrawerTrigger: import("react").ForwardRefExoticComponent<import("@radix-ui/react-dialog").DialogTriggerProps & import("react").RefAttributes<HTMLButtonElement>>;
declare const DrawerPortal: typeof import("vaul").Portal;
declare const DrawerClose: import("react").ForwardRefExoticComponent<import("@radix-ui/react-dialog").DialogCloseProps & import("react").RefAttributes<HTMLButtonElement>>;
declare const DrawerOverlay: FC<React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay> & {
    ref?: Ref<React.ElementRef<typeof DrawerPrimitive.Overlay>>;
}>;
declare const DrawerContent: FC<React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & {
    ref?: Ref<React.ElementRef<typeof DrawerPrimitive.Content>>;
}>;
declare const DrawerBody: (props: FlexProps) => import("react").JSX.Element;
declare const DrawerTitle: FC<React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title> & {
    ref?: Ref<React.ElementRef<typeof DrawerPrimitive.Title>>;
}>;
declare const DrawerDescription: FC<React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description> & {
    ref?: Ref<React.ElementRef<typeof DrawerPrimitive.Description>>;
}>;
declare const DrawerHeader: ({ title, description, customDescription, customHeader, customTitle, ...props }: FlexProps & {
    title: string;
    description?: string;
    customDescription?: ReactNode;
    customHeader?: ReactNode;
    customTitle?: ReactNode;
}) => import("react").JSX.Element;
declare const DrawerFooter: (props: FlexProps) => import("react").JSX.Element;
export type DrawerProps = React.ComponentProps<typeof DrawerRoot> & {
    disableInteractOutside?: boolean;
    title: string;
    description?: string;
    customHeader?: ReactNode;
    customTitle?: ReactNode;
};
declare const Drawer: ({ children, disableInteractOutside, title, description, customHeader, customTitle, ...props }: DrawerProps) => import("react").JSX.Element;
export { Drawer, DrawerBody, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerPortal, DrawerRoot, DrawerTitle, DrawerTrigger, };
