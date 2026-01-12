import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { FC, Ref } from "react";
import { PaperProps } from "@/components/Paper";
declare const HoverCard: React.FC<React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Root>>;
declare const HoverCardTrigger: import("react").ForwardRefExoticComponent<HoverCardPrimitive.HoverCardTriggerProps & import("react").RefAttributes<HTMLAnchorElement>>;
declare const HoverCardContent: FC<React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> & PaperProps & {
    ref?: Ref<React.ElementRef<typeof HoverCardPrimitive.Content>>;
}>;
export { HoverCard, HoverCardContent, HoverCardTrigger };
