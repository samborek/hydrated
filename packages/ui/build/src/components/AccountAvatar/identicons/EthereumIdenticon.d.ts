import { FlexProps } from "@/components/Flex";
export type EthereumIdenticonProps = FlexProps & {
    address: string;
    size: number;
};
export declare const EthereumIdenticon: React.FC<EthereumIdenticonProps>;
