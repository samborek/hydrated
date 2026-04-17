import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Children, cloneElement, isValidElement } from "react";
import { TriangleAlert } from "@/assets/icons";
import { Skeleton } from "../Skeleton";
import { Tooltip } from "../Tooltip";
import { LOGO_DIAMETER, SAssetBadge, SAssetChainLogo, SAssetLogo, SBadgeSlot, SDecorationContainer, } from "./AssetLogo.styled";
export const AssetLogo = ({ src, size = "medium", alt, chainSrc, badge, badgeTooltip, isLoading, decoration = "none", className, }) => {
    if (isLoading) {
        const skeletonSize = LOGO_DIAMETER[size];
        return _jsx(Skeleton, { width: skeletonSize, height: skeletonSize, circle: true });
    }
    return (_jsxs(SDecorationContainer, { count: 1, decoration: decoration, size: size, className: className, children: [_jsx(SAssetLogo, { src: src, alt: alt, size: size }), chainSrc && _jsx(SAssetChainLogo, { size: size, src: chainSrc }), badge && _jsx(Badge, { badge: badge, tooltip: badgeTooltip })] }));
};
export const MultipleAssetLogoWrapper = ({ size = "medium", children, decoration, }) => {
    return (_jsx(SDecorationContainer, { size: size, count: Children.count(children), decoration: decoration, children: Children.map(children, (child) => {
            if (isValidElement(child)) {
                return cloneElement(child, {
                    ...(child.props ?? {}),
                    ...{ size },
                    // override child decor to "none" if decoration from parent is the same
                    ...(typeof child.props === "object" &&
                        child.props !== null &&
                        "decoration" in child.props &&
                        decoration === child.props.decoration && {
                        decoration: "none",
                    }),
                });
            }
        }) }));
};
const Badge = ({ badge, tooltip }) => {
    const BadgeComp = (_jsx(SAssetBadge, { component: TriangleAlert, size: "100%", type: badge }));
    return (_jsx(SBadgeSlot, { children: tooltip ? _jsx(Tooltip, { text: tooltip, children: BadgeComp }) : BadgeComp }));
};
