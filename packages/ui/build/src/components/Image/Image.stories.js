import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Flex } from "@/components/Flex";
import { Image } from "./Image";
export default {
    component: Image,
};
const VALID_IMAGE_URL = "https://picsum.photos/500/500";
const INVALID_IMAGE_URL = "https://invalid-url-that-will-fail.com/image.jpg";
const PlaceholderComponent = () => (_jsx(Flex, { align: "center", justify: "center", borderColor: "#ccc", borderWidth: 2, borderStyle: "dashed", width: "100%", height: "100%", children: "Image failed to load" }));
const Template = (args) => (_jsx(Image, { ...args, width: 200, height: 200 }));
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
        placeholder: _jsx(PlaceholderComponent, {}),
    },
};
