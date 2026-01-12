import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { useState } from "react";
import { Flex } from "@/components";
import { Button } from "@/components/Button";
import { Stepper } from "./Stepper";
export default {
    component: Stepper,
};
const STEPS = [
    "Set fee payment asset",
    "Remove from Stablepool",
    "Remove from Omnipool",
];
const Template = (args) => {
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    const totalSteps = args.steps.length + 1;
    return (_jsxs(Flex, { direction: "column", gap: 20, children: [_jsx(Stepper, { ...args, activeStepIndex: activeStepIndex }), _jsxs(Flex, { gap: 10, justify: "space-between", mt: 20, children: [_jsx(Button, { size: "small", variant: "secondary", onClick: () => setActiveStepIndex((prev) => (prev - 1) % totalSteps), disabled: activeStepIndex === 0, children: "Previous" }), _jsx(Button, { size: "small", variant: "secondary", onClick: () => setActiveStepIndex((prev) => (prev + 1) % totalSteps), disabled: activeStepIndex === totalSteps - 1, children: "Next" })] })] }));
};
export const Default = {
    render: Template,
    args: {
        steps: STEPS,
        activeStepIndex: 0,
    },
};
export const CustomWidth = {
    render: Template,
    args: {
        steps: STEPS,
        activeStepIndex: 0,
        maxWidth: 500,
    },
};
