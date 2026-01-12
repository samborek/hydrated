import { jsx as _jsx, jsxs as _jsxs } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { AccountInput, Button, Flex, FormError, FormLabel, Separator, Stack, } from "@galacticcouncil/ui/components";
import { getTokenPx } from "@galacticcouncil/ui/utils";
import { Controller, useFormContext } from "react-hook-form";
import { first, pick } from "remeda";
import { useShallow } from "zustand/shallow";
import { AddressBookButton } from "@/components/address-book/AddressBookButton";
import { WalletProviderType } from "@/config/providers";
import { useWeb3Connect, useWeb3Enable } from "@/hooks";
import { toStoredAccount } from "@/utils";
import { ExternalWallet, getWallet } from "@/wallets";
export const ExternalWalletForm = ({ onAddressBookOpen, }) => {
    const { enable } = useWeb3Enable();
    const { setAccount, toggle } = useWeb3Connect(useShallow(pick(["setAccount", "toggle"])));
    const form = useFormContext();
    const wallet = getWallet(WalletProviderType.ExternalWallet);
    const onSubmit = async (values) => {
        const isExternalWallet = wallet instanceof ExternalWallet;
        if (!isExternalWallet)
            return;
        wallet.setAccount(values.address);
        await enable(WalletProviderType.ExternalWallet);
        const accounts = await wallet.getAccounts();
        const account = first(accounts);
        if (account) {
            setAccount(toStoredAccount(account));
            toggle();
        }
    };
    return (_jsx("form", { onSubmit: form.handleSubmit(onSubmit), children: _jsxs(Stack, { gap: "var(--modal-content-padding)", children: [_jsx(Controller, { name: "address", control: form.control, render: ({ field: { onChange, value }, fieldState: { error } }) => (_jsxs(Stack, { gap: getTokenPx("scales.paddings.m"), children: [_jsxs(Flex, { justify: "space-between", align: "center", children: [_jsx(FormLabel, { children: "Account address" }), _jsx(AddressBookButton, { onClick: onAddressBookOpen })] }), _jsx(AccountInput, { value: value, onChange: onChange, placeholder: "Paste account address here...", isError: !!error }), error && _jsx(FormError, { children: error.message })] })) }), _jsx(Separator, { mx: "var(--modal-content-inset)" }), _jsx(Button, { type: "submit", size: "large", width: "100%", children: "Confirm" })] }) }));
};
