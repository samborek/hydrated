import { jsxs as _jsxs, jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Button } from "@/components/Button";
import { SSliderTabs } from "@/components/SliderTabs/SliderTabs.styled";
export const SliderTabs = ({ options, selected, onSelect, disabled, className, ref, }) => {
    return (_jsx(SSliderTabs, { className: className, ref: ref, children: options.map((option) => {
            const isSelected = selected === option.id;
            return (_jsxs(Button, { "aria-label": option.label, variant: isSelected ? "sliderTabActive" : "sliderTabInactive", onClick: () => onSelect(option), disabled: disabled, sx: { flex: 1 }, children: [option.icon, option.label] }, option.id));
        }) }));
};
