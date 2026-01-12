import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import * as React from "react";
declare const NavigationMenu: React.FC<React.ComponentProps<typeof NavigationMenuPrimitive.Root>>;
declare const NavigationMenuList: React.FC<React.ComponentProps<typeof NavigationMenuPrimitive.List> & {
    ref?: React.Ref<HTMLUListElement>;
}>;
declare const NavigationMenuItem: React.FC<React.ComponentProps<typeof NavigationMenuPrimitive.Item>>;
declare const NavigationMenuTrigger: React.FC<React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>>;
declare const NavigationMenuContent: React.FC<React.ComponentProps<typeof NavigationMenuPrimitive.Content>>;
declare const NavigationMenuLink: React.FC<React.ComponentProps<typeof NavigationMenuPrimitive.Link>>;
export { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, };
