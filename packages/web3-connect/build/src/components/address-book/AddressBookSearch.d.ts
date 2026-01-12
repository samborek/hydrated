import { FC } from "react";
type Props = {
    readonly canAdd: boolean;
    readonly searchPhrase: string;
    readonly onSearchPhraseChange: (searchPhrase: string) => void;
    readonly onAdd: () => void;
};
export declare const AddressBookSearch: FC<Props>;
export {};
