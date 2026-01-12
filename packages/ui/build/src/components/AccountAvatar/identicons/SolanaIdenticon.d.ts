import { FlexProps } from "@/components/Flex";
export type SolanaIdenticonProps = Omit<FlexProps, "size"> & {
    size: number;
};
export declare const SolanaIdenticon: React.FC<SolanaIdenticonProps>;
