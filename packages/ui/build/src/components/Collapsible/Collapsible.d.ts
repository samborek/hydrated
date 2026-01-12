import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import React from "react";
declare const CollapsibleRoot: ({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Root>) => React.JSX.Element;
declare const CollapsibleTrigger: ({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) => React.JSX.Element;
declare const CollapsibleContent: ({ ...props }: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) => React.JSX.Element;
export type CollapsibleRootProps = React.ComponentProps<typeof CollapsiblePrimitive.Root>;
type CollapsibleProps = CollapsibleRootProps & ({
    trigger: React.ReactNode;
    label?: never;
    actionLabel?: never;
    actionLabelWhenOpen?: never;
} | {
    trigger?: never;
    label: string | React.ReactNode;
    actionLabel: string;
    actionLabelWhenOpen?: string;
});
declare const Collapsible: React.FC<CollapsibleProps>;
export { Collapsible, CollapsibleContent, CollapsibleRoot, CollapsibleTrigger };
