import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { getToken } from "@/utils";
import { ProgressCircle } from "./ProgressCircle";
export default {
    component: ProgressCircle,
};
const Template = (props) => {
    return _jsx(ProgressCircle, { ...props });
};
export const Default = {
    render: Template,
    args: {
        percent: 33,
    },
};
export const CustomColor = {
    render: Template,
    args: {
        percent: 33,
        color: getToken("colors.successGreen.400"),
    },
};
export const Thickness = {
    render: Template,
    args: {
        percent: 33,
        thickness: 10,
    },
};
export const Radius = {
    render: Template,
    args: {
        percent: 33,
        radius: 100,
    },
};
export const LabelStart = {
    render: Template,
    args: {
        percent: 33,
        radius: 14,
        labelPosition: "start",
    },
};
export const LabelEnd = {
    render: Template,
    args: {
        percent: 33,
        radius: 14,
        labelPosition: "end",
    },
};
export const CustomLabel = {
    render: Template,
    args: {
        percent: 33,
        label: _jsx("span", { sx: { fontSize: 24, textAlign: "center" }, children: "$33" }),
    },
};
export const ReversedDirection = {
    render: Template,
    args: {
        percent: 33,
        isReversed: true,
    },
};
