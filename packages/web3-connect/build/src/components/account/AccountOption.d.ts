import { Account } from "@/hooks/useWeb3Connect";
export type AccountOptionProps = Account & {
    className?: string;
    isActive?: boolean;
    isProxy?: boolean;
    isBalanceLoading?: boolean;
    onSelect?: (account: Account) => void;
    onEdit?: (name: string) => void;
    onDelete?: () => void;
};
export declare const AccountOption: React.FC<AccountOptionProps>;
