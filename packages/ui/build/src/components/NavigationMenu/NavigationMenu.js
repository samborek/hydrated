import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { SNavigationMenuContent, SNavigationMenuItem, SNavigationMenuLink, SNavigationMenuList, SNavigationMenuRoot, SNavigationMenuTrigger, } from "./NavigationMenu.styled";
const NavigationMenu = ({ children, ...props }) => {
    return _jsx(SNavigationMenuRoot, { ...props, children: children });
};
const NavigationMenuList = (props) => {
    return _jsx(SNavigationMenuList, { ...props, ref: props.ref });
};
const NavigationMenuItem = (props) => {
    return _jsx(SNavigationMenuItem, { ...props });
};
const NavigationMenuTrigger = ({ children, ...props }) => {
    return _jsx(SNavigationMenuTrigger, { ...props, children: children });
};
const NavigationMenuContent = (props) => {
    return _jsx(SNavigationMenuContent, { ...props });
};
const NavigationMenuLink = (props) => _jsx(SNavigationMenuLink, { ...props });
export { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, };
