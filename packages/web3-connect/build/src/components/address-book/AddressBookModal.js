import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { Flex, ModalBody } from "@galacticcouncil/ui/components";
import { safeConvertSS58toPublicKey } from "@galacticcouncil/utils";
import { getWalletModeByAddress, PROVIDERS_BY_WALLET_MODE, WalletMode, Web3ConnectAccount, } from "@galacticcouncil/web3-connect";
import { useEffect, useState } from "react";
import { AccountFilter, allAccountFilterOptions, } from "@/components/account/AccountFilter";
import { AccountRemoveModal } from "@/components/account/AccountRemoveModal";
import { useAddressStore, } from "@/components/address-book/AddressBook.store";
import { AddressBookEmptyState } from "@/components/address-book/AddressBookEmptyState";
import { AddressBookSearch } from "@/components/address-book/AddressBookSearch";
export const AddressBookModal = ({ header, align = "default", whitelist, blacklist, onSelect, }) => {
    const [publicKeyToRemove, setPublicKeyToRemove] = useState("");
    const [searchPhrase, setSearchPhrase] = useState("");
    const [filter, setFilter] = useState(whitelist ? (whitelist[0] ?? WalletMode.Default) : WalletMode.Default);
    const { addresses: allAddresses, add, edit, remove } = useAddressStore();
    const allAddressesProviders = new Set(allAddresses.map((address) => address.provider));
    const validFilterOptions = whitelist ?? allAccountFilterOptions;
    const filterOptions = validFilterOptions.filter((mode) => PROVIDERS_BY_WALLET_MODE[mode].some((provider) => allAddressesProviders.has(provider)));
    const validProviders = PROVIDERS_BY_WALLET_MODE[filter];
    const filteredAddresses = allAddresses.filter((address) => validProviders.includes(address.provider));
    const searchedAddresses = filteredAddresses.filter((address) => address.name.toLowerCase().includes(searchPhrase.toLowerCase()) ||
        address.address.toLowerCase().includes(searchPhrase.toLowerCase()) ||
        address.publicKey.toLowerCase().includes(searchPhrase.toLowerCase()));
    const addressProvider = getWalletModeByAddress(searchPhrase);
    const addressPublicKey = safeConvertSS58toPublicKey(searchPhrase);
    const canAdd = !searchedAddresses.length &&
        !!addressProvider &&
        !allAddresses.find((address) => address.publicKey === addressPublicKey) &&
        validFilterOptions.includes(addressProvider);
    useEffect(() => {
        if (filter !== WalletMode.Default && !filterOptions.includes(filter)) {
            setFilter(WalletMode.Default);
        }
    }, [filterOptions, filter]);
    if (publicKeyToRemove) {
        return (_jsx(AccountRemoveModal, { align: align, onDelete: () => {
                remove(publicKeyToRemove);
                setPublicKeyToRemove("");
            }, onCancel: () => setPublicKeyToRemove(""), onBack: () => setPublicKeyToRemove("") }));
    }
    const addNewAddress = () => {
        if (!canAdd) {
            return;
        }
        add({
            address: searchPhrase,
            name: "My Account",
            provider: PROVIDERS_BY_WALLET_MODE[addressProvider][0],
            publicKey: addressPublicKey,
            isCustom: true,
        });
        setSearchPhrase("");
        if (filter !== addressProvider) {
            setFilter(WalletMode.Default);
        }
    };
    return (_jsxs(_Fragment, { children: [header, _jsxs(ModalBody, { sx: { display: "flex", flexDirection: "column", gap: 20 }, children: [_jsx(AddressBookSearch, { canAdd: canAdd, searchPhrase: searchPhrase, onSearchPhraseChange: setSearchPhrase, onAdd: addNewAddress }), filterOptions.length > 1 && (_jsx(AccountFilter, { active: filter, whitelist: filterOptions, blacklist: blacklist, onSetActive: setFilter })), searchedAddresses.length === 0 ? (_jsx(AddressBookEmptyState, { canAdd: canAdd })) : (_jsx(Flex, { direction: "column", gap: 10, children: searchedAddresses.map((address) => (_jsx(Web3ConnectAccount, { rawAddress: address.address, publicKey: address.publicKey, name: address.name, address: address.address, displayAddress: address.address, provider: address.provider, ...(onSelect && { onSelect: () => onSelect(address) }), ...(address.isCustom && {
                                onEdit: (name) => {
                                    edit({
                                        ...address,
                                        name,
                                    });
                                },
                                onDelete: () => setPublicKeyToRemove(address.publicKey),
                            }) }, address.publicKey))) }))] })] }));
};
