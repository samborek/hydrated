import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { useState } from "@storybook/preview-api";
import { Search } from "lucide-react";
import { AssetLogo } from "@/components/AssetLogo";
import { Box } from "@/components/Box";
import { Button } from "@/components/Button";
import { Flex } from "@/components/Flex";
import { Input } from "@/components/Input";
import { Text } from "@/components/Text";
import { getToken } from "@/utils";
import { Drawer, DrawerBody, DrawerClose, DrawerFooter, } from "./Drawer";
export default {
    component: Drawer,
};
const DefaultTemplate = (args) => {
    const [open, setOpen] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: () => setOpen(true), children: "Open Drawer" }), _jsx(Drawer, { ...args, title: "Lorem ipsum", open: open, onOpenChange: setOpen, children: _jsx(DrawerBody, { children: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda eaque iure nostrum numquam illum aperiam quasi possimus explicabo quidem atque ipsa, quam sed corporis ullam blanditiis laboriosam in labore. Velit." }) })] }));
};
const WithHeaderAndFooterTemplate = (args) => {
    const [open, setOpen] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: () => setOpen(true), children: "Open Drawer" }), _jsxs(Drawer, { ...args, open: open, onOpenChange: setOpen, title: "Review Transaction", description: "Transfer 100 DOT from Hydration to Polkadot", children: [_jsx(DrawerBody, { children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit ipsum tenetur modi consequatur qui, soluta ratione eveniet cumque aperiam porro numquam perspiciatis voluptatum officia, voluptates ducimus tempora obcaecati placeat iure?" }), _jsxs(DrawerFooter, { justify: "space-between", children: [_jsx(DrawerClose, { asChild: true, children: _jsx(Button, { size: "large", variant: "secondary", children: "Cancel" }) }), _jsx(Button, { size: "large", variant: "primary", children: "Sign transaction" })] })] })] }));
};
const WithCustomHeaderTemplate = (args) => {
    const [open, setOpen] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: () => setOpen(true), children: "Open Drawer" }), _jsx(Drawer, { ...args, open: open, title: "Lorem ipsum", onOpenChange: setOpen, customTitle: _jsx(Box, { m: "var(--modal-content-inset)", children: _jsx(Input, { placeholder: "Search tokens...", variant: "embedded", customSize: "large", iconStart: Search }) }), children: _jsx(DrawerBody, { p: 0, children: _jsx(Box, { mx: "var(--modal-content-inset)", mt: "var(--modal-content-inset)", children: Array.from({ length: 100 }).map((_, i) => (_jsxs(Flex, { py: 10, px: "var(--modal-content-padding)", justify: "space-between", align: "center", children: [_jsxs(Flex, { align: "center", gap: 8, children: [_jsx(AssetLogo, { src: "https://cdn.jsdelivr.net/gh/galacticcouncil/intergalactic-asset-metadata@latest/v2/polkadot/2034/assets/0/icon.svg" }), _jsx(Text, { fw: 600, children: "HDX" })] }), _jsx(Text, { fs: "p6", color: getToken("text.medium"), children: "$1 000" })] }, i))) }) }) })] }));
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
export const WithCustomHeader = {
    render: WithCustomHeaderTemplate,
};
