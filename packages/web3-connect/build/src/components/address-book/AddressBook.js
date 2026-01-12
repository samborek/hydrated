import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { AccountInput, Flex, Label, Text } from "@galacticcouncil/ui/components";
import { getToken, getTokenPx, px } from "@galacticcouncil/ui/utils";
import { useId } from "react";
import { useAddressStore } from "@/components/address-book/AddressBook.store";
import { AddressBookButton } from "@/components/address-book/AddressBookButton";
import { TALISMAN_PROVIDERS } from "@/config/providers";
export const AddressBook = ({ address, error, onAddressChange, onOpenMyContacts, }) => {
    const id = useId();
    const { addresses } = useAddressStore();
    const provider = addresses.find((a) => a.address === address)?.provider;
    const isTalisman = !!provider && TALISMAN_PROVIDERS.includes(provider);
    return (_jsxs(Flex, { py: getTokenPx("containers.paddings.primary"), direction: "column", justify: "flex-end", children: [_jsxs(Flex, { direction: "column", gap: getTokenPx("scales.paddings.m"), children: [_jsxs(Flex, { justify: "space-between", align: "center", children: [_jsx(Label, { fw: 500, fs: 12, lh: px(15), color: getToken("text.medium"), htmlFor: id, children: "Destination address" }), _jsx(AddressBookButton, { onClick: onOpenMyContacts })] }), _jsx(AccountInput, { id: id, value: address, onChange: onAddressChange, avatarTheme: isTalisman ? "talisman" : "auto", placeholder: "Paste address here...", isError: !!error })] }), error && (_jsx(Text, { font: "secondary", fw: 400, fs: 12, lh: 1, color: getToken("accents.danger.secondary"), ml: "auto", children: error }))] }));
};
