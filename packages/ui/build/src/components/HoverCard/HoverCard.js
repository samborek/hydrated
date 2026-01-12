import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { SHoverCardContent } from "@/components/HoverCard/HoverCard.styled";
import { Paper } from "@/components/Paper";
const HoverCard = ({ openDelay = 0, closeDelay = 50, ...props }) => (_jsx(HoverCardPrimitive.Root, { openDelay: openDelay, closeDelay: closeDelay, ...props }));
const HoverCardTrigger = HoverCardPrimitive.Trigger;
const HoverCardContent = ({ align = "start", sideOffset = 4, collisionPadding = 4, p = 12, children, ref, ...props }) => (_jsx(SHoverCardContent, { ref: ref, align: align, sideOffset: sideOffset, collisionPadding: collisionPadding, asChild: true, ...props, children: _jsx(Paper, { p: p, children: children }) }));
export { HoverCard, HoverCardContent, HoverCardTrigger };
