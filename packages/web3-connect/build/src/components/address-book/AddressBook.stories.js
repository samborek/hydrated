import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Modal, ModalHeader } from "@galacticcouncil/ui/components";
import { useState } from "react";
import { AddressBookModal } from "@/components/address-book/AddressBookModal";
import { AddressBook } from "./AddressBook";
export default {
    component: AddressBook,
};
export const AddressBookStory = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [address, setAddress] = useState("0x1234567890123456789012345678901234567890");
    return (_jsxs(_Fragment, { children: [_jsx(AddressBook, { address: address, onAddressChange: setAddress, onOpenMyContacts: () => setIsModalOpen(true) }), _jsx(Modal, { open: isModalOpen, onOpenChange: setIsModalOpen, children: _jsx(AddressBookModal, { header: _jsx(ModalHeader, { title: "My custom address book modal" }), onSelect: (address) => {
                        setAddress(address.address);
                        setIsModalOpen(false);
                    } }) })] }));
};
