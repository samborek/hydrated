import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Points } from "@/components/Points/Points";
export default {
    component: Points,
};
export const PointsStory = () => {
    return _jsx(Points, { number: 1, title: "Title", description: "Description" });
};
