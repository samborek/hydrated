import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Button } from "@/components/Button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./HoverCard";
export default {
    component: HoverCard,
};
const Template = (args) => (_jsxs(HoverCard, { ...args, children: [_jsx(HoverCardTrigger, { asChild: true, children: _jsx(Button, { children: "Hover me" }) }), _jsx(HoverCardContent, { maxWidth: 320, children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et sint commodi quasi totam fugiat reprehenderit pariatur nemo, vel distinctio doloribus magni quibusdam, expedita voluptatibus nihil tempora blanditiis quaerat aut qui?" })] }));
export const Default = {
    render: Template,
};
