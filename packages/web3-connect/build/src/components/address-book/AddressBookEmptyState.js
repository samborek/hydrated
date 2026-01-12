import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { NotebookTabs } from "@galacticcouncil/ui/assets/icons";
import { Flex, Icon, Text } from "@galacticcouncil/ui/components";
import { getToken } from "@galacticcouncil/ui/utils";
export const AddressBookEmptyState = ({ canAdd }) => {
    return (_jsxs(Flex, { direction: "column", align: "center", color: getToken("text.medium"), py: 56, children: [_jsx(Icon, { component: NotebookTabs, size: 40, mb: 16 }), _jsx(Text, { fw: 500, children: "This address is not on your list." }), canAdd && _jsx(Text, { fw: 500, children: "Click Add to add it to your contacts." })] }));
};
