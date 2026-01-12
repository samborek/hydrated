import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Fragment } from "react";
import { clamp } from "remeda";
import { CheckIcon } from "@/assets/icons";
import { Flex } from "@/components/Flex";
import { Icon } from "@/components/Icon";
import { getStepState, StepState } from "@/components/Stepper/Stepper.utils";
import { Text } from "@/components/Text";
import { getToken } from "@/utils";
import { SCircle, SDesktopContainer, SMobileContainer, SStepContainer, SStepLabel, SStepperContainer, SStepperLine, } from "./Stepper.styled";
const Step = ({ label, state, number }) => (_jsxs(SStepContainer, { children: [_jsx(SCircle, { state: state, children: state === StepState.Done ? (_jsx(Icon, { component: CheckIcon, size: 14 })) : (number) }), _jsx(SStepLabel, { color: state === StepState.Active
                ? getToken("text.tint.secondary")
                : getToken("text.medium"), children: label })] }));
export const Stepper = ({ steps, activeStepIndex, maxWidth, className, ...props }) => {
    const totalSteps = steps.length;
    const currentIndex = clamp(activeStepIndex, {
        min: 0,
        max: totalSteps - 1,
    });
    const currentLabel = steps[currentIndex];
    return (_jsxs(SStepperContainer, { className: className, ...props, children: [_jsx(SDesktopContainer, { maxWidth: maxWidth, children: steps.map((label, index) => (_jsxs(Fragment, { children: [_jsx(Step, { label: label, number: index + 1, state: getStepState(index, activeStepIndex) }), index < steps.length - 1 && _jsx(SStepperLine, {})] }, index))) }), _jsxs(SMobileContainer, { children: [_jsx(Text, { color: getToken("text.high"), fs: "p5", fw: 500, truncate: true, children: currentLabel }), _jsx(Flex, { gap: 4, children: steps.map((label, index) => (_jsx(Step, { label: label, number: index + 1, state: getStepState(index, activeStepIndex) }, index))) })] })] }));
};
