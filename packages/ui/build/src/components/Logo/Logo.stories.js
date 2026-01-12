import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { keys } from "remeda";
import { LOGO_SIZES } from "@/components/Logo/Logo.styled";
import { Stack } from "@/components/Stack";
import { Logo } from "./Logo";
export default {
    component: Logo,
};
const VALID_IMAGE_URL = "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png";
const INVALID_IMAGE_URL = "https://invalid-url-that-will-fail.com/image.jpg";
const Template = (args) => (_jsx(Stack, { gap: 20, children: keys(LOGO_SIZES).map((size) => (_jsx(Logo, { ...args, size: size }, size))) }));
export const Default = {
    render: Template,
    args: {
        src: VALID_IMAGE_URL,
    },
};
export const WithPlaceholder = {
    render: Template,
    args: {
        src: INVALID_IMAGE_URL,
    },
};
