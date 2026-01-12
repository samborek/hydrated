import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Paper } from "./Paper";
export default {
    component: Paper,
};
const Template = (args) => (_jsx(Paper, { ...args, width: 500, p: 20, children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam a natus itaque corrupti perferendis fuga eligendi provident dolore fugiat, vitae laboriosam. Quasi culpa maxime eaque ipsum porro neque a fugit." }));
export const Default = {
    render: Template,
};
export const Plain = {
    render: Template,
    args: {
        variant: "plain",
    },
};
