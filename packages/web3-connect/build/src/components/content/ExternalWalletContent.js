import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { ModalBody, ModalHeader } from "@galacticcouncil/ui/components";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { AddressBookModal } from "@/components/address-book";
import { ExternalWalletForm } from "@/components/external/ExternalWalletForm";
import { useExternalWalletForm } from "@/components/external/ExternalWalletForm.form";
import { Web3ConnectModalPage } from "@/config/modal";
import { useWeb3ConnectContext } from "@/context/Web3ConnectContext";
export const ExternalWalletContent = () => {
    const [isAddressBookOpen, setIsAddressBookOpen] = useState(false);
    const form = useExternalWalletForm();
    const { setPage } = useWeb3ConnectContext();
    if (isAddressBookOpen) {
        return (_jsx(AddressBookModal, { header: _jsx(ModalHeader, { title: "Select account to use", onBack: () => setIsAddressBookOpen(false) }), onSelect: (address) => {
                form.setValue("address", address.address, { shouldValidate: true });
                setIsAddressBookOpen(false);
            } }));
    }
    return (_jsxs(FormProvider, { ...form, children: [_jsx(ModalHeader, { title: "View external account", description: "Paste account address you would like to monitor.", align: "center", onBack: () => setPage(Web3ConnectModalPage.ProviderSelect) }), _jsx(ModalBody, { children: _jsx(ExternalWalletForm, { onAddressBookOpen: () => setIsAddressBookOpen(true) }) })] }));
};
