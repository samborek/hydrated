import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { ThemeUICSSProperties } from "@theme-ui/css";
import { FC, Ref } from "react";
type ScrollbarOrientation = React.ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>["orientation"];
export type ScrollAreaProps = React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
    height?: ThemeUICSSProperties["height"];
    width?: ThemeUICSSProperties["width"];
    orientation?: ScrollbarOrientation;
    viewportRef?: React.Ref<HTMLDivElement>;
    ref?: Ref<React.ElementRef<typeof ScrollAreaPrimitive.Root>>;
};
declare const ScrollArea: FC<ScrollAreaProps>;
declare function ScrollBar({ orientation, ...props }: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>): import("react").JSX.Element;
export { ScrollArea, ScrollBar };
