import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Button } from "@/components/Button";
import { Collapsible } from "./Collapsible";
export default {
    component: Collapsible,
};
export const Default = () => {
    return (_jsx(Collapsible, { label: "Collapsible", actionLabel: "Open", actionLabelWhenOpen: "Close", children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos enim quia ex provident aut explicabo voluptatem totam suscipit perferendis, reprehenderit quo modi repudiandae illo voluptas repellendus repellat sequi a asperiores?" }));
};
export const InitiallyOpen = () => {
    return (_jsx(Collapsible, { label: "Collapsible", actionLabel: "Open", actionLabelWhenOpen: "Close", defaultOpen: true, children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos enim quia ex provident aut explicabo voluptatem totam suscipit perferendis, reprehenderit quo modi repudiandae illo voluptas repellendus repellat sequi a asperiores?" }));
};
export const CustomTrigger = () => {
    return (_jsx(Collapsible, { trigger: _jsx(Button, { children: "open" }), children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos enim quia ex provident aut explicabo voluptatem totam suscipit perferendis, reprehenderit quo modi repudiandae illo voluptas repellendus repellat sequi a asperiores?" }));
};
