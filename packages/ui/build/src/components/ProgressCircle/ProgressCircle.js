import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { SBackgroundCircle, SContainer, SProgressCircle, SText, } from "@/components/ProgressCircle/ProgressCircle.styled";
import { useResponsiveValue } from "@/styles/media";
import { getToken } from "@/utils";
export const ProgressCircle = ({ radius: givenRadius, thickness: givenThickness, labelPosition: givenLabelPosition, percent = 0, isReversed = false, label, fontSize = 14, color = getToken("controls.solid.accent"), ref, ...props }) => {
    const radius = useResponsiveValue(givenRadius, 45);
    const thickness = useResponsiveValue(givenThickness, 4);
    const labelPosition = useResponsiveValue(givenLabelPosition, "center");
    const { circumference, size, position, transformFlip, transformRotate } = calculateCircleProps(radius, thickness, isReversed);
    return (_jsxs(SContainer, { ref: ref, color: color, ...props, children: [_jsxs("svg", { width: size, height: size, viewBox: `0 0 ${size} ${size}`, children: [_jsx(SBackgroundCircle, { strokeWidth: Math.max(thickness - 2, 1), r: radius, cx: position, cy: position }), _jsx(SProgressCircle, { transform: `${transformFlip} ${transformRotate}`, strokeWidth: thickness, strokeDasharray: circumference, strokeDashoffset: circumference - (percent / 100) * circumference, strokeLinecap: "round", r: radius, cx: position, cy: position })] }), _jsx(SText, { position: labelPosition, sx: { fontSize }, children: label || `${percent}%` })] }));
};
function calculateCircleProps(radius, thickness, isReversed) {
    const circumference = radius * 2 * Math.PI;
    const size = radius * 2 + thickness;
    const position = radius + thickness / 2;
    const transformFlip = isReversed ? `scale(1, -1) translate(0, -${size})` : "";
    const transformRotate = isReversed
        ? `rotate(90, ${size / 2} ,${size / 2})`
        : `rotate(-90, ${size / 2} ,${size / 2})`;
    return {
        circumference,
        size,
        position,
        transformFlip,
        transformRotate,
    };
}
