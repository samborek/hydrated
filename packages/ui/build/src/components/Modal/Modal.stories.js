import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { useState } from "@storybook/preview-api";
import { Search } from "lucide-react";
import { AssetLogo } from "@/components/AssetLogo";
import { Box } from "@/components/Box";
import { Button } from "@/components/Button";
import { Flex } from "@/components/Flex";
import { Input } from "@/components/Input";
import { Text } from "@/components/Text";
import { getToken } from "@/utils";
import { Modal, ModalBody, ModalCloseTrigger, ModalFooter, ModalHeader, } from "./Modal";
export default {
    component: Modal,
};
const DefaultTemplate = (args) => {
    const [open, setOpen] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: () => setOpen(true), children: "Open Modal" }), _jsxs(Modal, { ...args, open: open, onOpenChange: setOpen, children: [_jsx(ModalHeader, { title: "Lorem ipsum" }), _jsx(ModalBody, { children: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda eaque iure nostrum numquam illum aperiam quasi possimus explicabo quidem atque ipsa, quam sed corporis ullam blanditiis laboriosam in labore. Velit." })] })] }));
};
const WithHeaderAndFooterTemplate = (args) => {
    const [open, setOpen] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: () => setOpen(true), children: "Open Modal" }), _jsxs(Modal, { ...args, open: open, onOpenChange: setOpen, children: [_jsx(ModalHeader, { title: "Review Transaction", description: "Transfer 100 DOT from Hydration to Polkadot" }), _jsx(ModalBody, { children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit ipsum tenetur modi consequatur qui, soluta ratione eveniet cumque aperiam porro numquam perspiciatis voluptatum officia, voluptates ducimus tempora obcaecati placeat iure?" }), _jsxs(ModalFooter, { justify: "space-between", children: [_jsx(ModalCloseTrigger, { asChild: true, children: _jsx(Button, { size: "large", variant: "secondary", children: "Cancel" }) }), _jsx(Button, { size: "large", variant: "primary", children: "Sign transaction" })] })] })] }));
};
const WithCustomHeaderTemplate = (args) => {
    const [open, setOpen] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: () => setOpen(true), children: "Open Modal" }), _jsxs(Modal, { ...args, open: open, onOpenChange: setOpen, children: [_jsx(ModalHeader, { title: "Lorem ipsum", customTitle: _jsx(Box, { m: "var(--modal-content-inset)", children: _jsx(Input, { placeholder: "Search tokens...", variant: "embedded", customSize: "large", iconStart: Search }) }) }), _jsx(ModalBody, { p: 0, children: _jsx(Box, { mx: "var(--modal-content-inset)", mt: "var(--modal-content-inset)", children: Array.from({ length: 100 }).map((_, i) => (_jsxs(Flex, { py: 10, px: "var(--modal-content-padding)", justify: "space-between", align: "center", children: [_jsxs(Flex, { align: "center", gap: 8, children: [_jsx(AssetLogo, { alt: "0", src: "https://cdn.jsdelivr.net/gh/galacticcouncil/intergalactic-asset-metadata@latest/v2/polkadot/2034/assets/0/icon.svg" }), _jsx(Text, { fw: 600, children: "HDX" })] }), _jsx(Text, { fs: "p6", color: getToken("text.medium"), children: "$1 000" })] }, i))) }) })] })] }));
};
export const Default = {
    render: DefaultTemplate,
};
export const DisabledInteractOutside = {
    render: DefaultTemplate,
    args: {
        disableInteractOutside: true,
    },
};
export const WithHeaderAndFooter = {
    render: WithHeaderAndFooterTemplate,
};
export const WithTopContent = {
    render: WithHeaderAndFooterTemplate,
    args: {
        variant: "popup",
        topContent: _jsx("div", { children: "Top Content" }),
    },
};
export const WithCustomHeader = {
    render: WithCustomHeaderTemplate,
};
export const ForcedDrawerVariant = {
    render: WithCustomHeaderTemplate,
    args: {
        variant: "drawer",
    },
};
export const ForcedPopupVariant = {
    render: WithCustomHeaderTemplate,
    args: {
        variant: "popup",
    },
};
