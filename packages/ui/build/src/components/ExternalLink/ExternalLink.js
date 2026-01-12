import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
export const ExternalLink = (props) => {
    return (_jsx("a", { target: "_blank", rel: "noopener noreferrer", ref: props.ref, ...props }));
};
