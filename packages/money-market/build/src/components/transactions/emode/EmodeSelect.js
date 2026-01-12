import { jsx as _jsx } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Select } from "@galacticcouncil/ui/components";
import { getEmodeMessage } from "./emode.utils";
export const EmodeSelect = ({ emodeCategories, selectedEmode, setSelectedEmode, userEmode, }) => {
    return (_jsx(Select, { value: selectedEmode?.toString(), onValueChange: (key) => {
            setSelectedEmode(emodeCategories[Number(key)]);
        }, items: Object.keys(emodeCategories)
            .filter((categoryKey) => userEmode !== Number(categoryKey) && Number(categoryKey) !== 0)
            .map((categoryKey) => ({
            key: categoryKey,
            label: getEmodeMessage(emodeCategories[Number(categoryKey)].label),
        })) }));
};
