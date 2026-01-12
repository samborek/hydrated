import { FC } from "react";
export type AddressBookProps = {
    readonly address: string;
    readonly error?: string;
    readonly onAddressChange: (address: string) => void;
    readonly onOpenMyContacts: () => void;
};
export declare const AddressBook: FC<AddressBookProps>;
