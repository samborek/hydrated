import { FC } from "react";
import { AccountFilterOptionOverride } from "@/components/account/AccountFilter";
import { Address } from "@/components/address-book/AddressBook.store";
type Props = {
    readonly header?: React.ReactNode;
    readonly align?: "default" | "center";
    readonly whitelist?: ReadonlyArray<AccountFilterOptionOverride>;
    readonly blacklist?: ReadonlyArray<AccountFilterOptionOverride>;
    readonly onSelect?: (address: Address) => void;
};
export declare const AddressBookModal: FC<Props>;
export {};
