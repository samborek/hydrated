import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Button, Flex, Input } from "@galacticcouncil/ui/components";
import { Search } from "lucide-react";
export const AddressBookSearch = ({ canAdd, searchPhrase, onSearchPhraseChange, onAdd, }) => {
    return (_jsxs(Flex, { align: "center", gap: 10, position: "relative", children: [_jsx(Input, { sx: { flex: 1 }, customSize: "large", iconStart: Search, placeholder: "Search or paste address to add", value: searchPhrase, onChange: (e) => onSearchPhraseChange(e.target.value) }), canAdd && (_jsx(Button, { sx: { position: "absolute" }, right: 20, top: "50%", transform: "translateY(-50%)", variant: "secondary", size: "small", onClick: onAdd, children: "Add" }))] }));
};
