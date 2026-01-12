import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import "react-loading-skeleton/dist/skeleton.css";
import { ClassNames } from "@emotion/react";
import SkeletonPrimitive from "react-loading-skeleton";
import { useTheme } from "@/theme";
export const Skeleton = (props) => {
    const { getToken } = useTheme();
    return (_jsx(ClassNames, { children: ({ css }) => (_jsx(SkeletonPrimitive, { containerClassName: css(props.className), baseColor: getToken("details.skeleton"), highlightColor: getToken("details.skeleton"), ...props })) }));
};
