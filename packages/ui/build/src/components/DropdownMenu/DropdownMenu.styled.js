import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Separator } from "@/components/Separator";
import { createVariants } from "@/utils";
export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = styled(DropdownMenuPrimitive.Trigger) `
  cursor: pointer;
`;
const animationVariants = createVariants((theme) => ({
    "slide-bottom": css `
    &[data-state="open"] {
      animation-name: ${theme.animations.slideInBottom};
    }
    &[data-state="closed"] {
      animation-name: ${theme.animations.slideOutBottom};
    }
  `,
    "slide-top": css `
    &[data-state="open"] {
      animation-name: ${theme.animations.slideInTop};
    }
    &[data-state="closed"] {
      animation-name: ${theme.animations.slideOutTop};
    }
  `,
    "scale-bottom": css `
    &[data-state="open"] {
      animation-name: ${theme.animations.scaleInBottom};
    }
    &[data-state="closed"] {
      animation-name: ${theme.animations.scaleOutBottom};
    }
  `,
    "scale-top": css `
    &[data-state="open"] {
      animation-name: ${theme.animations.scaleInTop};
    }
    &[data-state="closed"] {
      animation-name: ${theme.animations.scaleOutTop};
    }
  `,
}));
const SDropdownMenuContent = styled(DropdownMenuPrimitive.Content)(({ theme, animation = "scale-top", fullWidth }) => [
    css `
    --dropdown-menu-content-horizontal-padding: ${theme.containers.paddings
        .quart}px;

    display: flex;
    flex-direction: column;
    justify-content: stretch;

    ${fullWidth &&
        css `
      width: calc(100vw - 27px);
      margin: 0 13.5px;
    `}

    padding: ${theme.buttons.paddings.tertiary}px
      var(--dropdown-menu-content-horizontal-padding);
    background-color: ${theme.surfaces.containers.high.primary};
    border: 1px solid ${theme.details.borders};
    border-radius: ${theme.scales.cornerRadius.xl}px;

    box-shadow: 0px 38px 187px 0px #00000066;
    box-shadow: 0px 3px 9px 0px #0000001a;

    z-index: ${theme.zIndices.popover};

    animation-duration: 250ms;
    animation-timing-function: ${theme.easings.outExpo};
  `,
    animationVariants(animation),
]);
export const DropdownMenuContent = ({ animation, ...props }) => {
    return (_jsx(DropdownMenuPrimitive.Portal, { children: _jsx(SDropdownMenuContent, { sideOffset: 13, animation: animation, ...props }) }));
};
export const DropdownMenuItem = styled(DropdownMenuPrimitive.Item) `
  &:focus {
    outline: none;
  }
`;
export const DropdownMenuContentDivider = styled(Separator)(({ theme }) => css `
    width: calc(
      100% + calc(2 * var(--dropdown-menu-content-horizontal-padding))
    );

    margin: ${theme.scales.paddings.s}px
      calc(0px - var(--dropdown-menu-content-horizontal-padding));
  `);
