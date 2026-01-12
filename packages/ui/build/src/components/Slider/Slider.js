import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Fragment } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Range } from "@radix-ui/react-slider";
import { useMemo } from "react";
import { useMeasure } from "react-use";
import { Union } from "@/assets/icons";
import { getToken } from "@/utils";
import { Icon } from "../Icon/Icon";
import { SDash, SRange, SRoot, SThumb, STrack } from "./Slider.styled";
export const Slider = ({ min, max, step, value, onChange, disabled, dashCount = 20, }) => {
    const [ref, { width }] = useMeasure();
    const dashes = useMemo(() => Array.from({ length: dashCount + 1 }).map((_, i) => (_jsxs(Fragment, { children: [_jsx(SDash, { offset: i * (width / dashCount), row: "top" }, `top-${i}`), _jsx(SDash, { offset: i * (width / dashCount), row: "bottom" }, `bottom-${i}`)] }, i))), [width, dashCount]);
    return (_jsxs(SRoot, { value: [value], onValueChange: (v) => onChange(v[0]), min: min, max: max, step: step, disabled: disabled, ref: ref, children: [dashes, _jsx(STrack, { children: _jsx(Range, { asChild: true, children: _jsx(SRange, {}) }) }), _jsx(SThumb, { children: _jsx(Icon, { size: 10, component: Union, color: getToken("controls.outline.active") }) })] }));
};
