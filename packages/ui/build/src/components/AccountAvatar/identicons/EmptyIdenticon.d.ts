import { FlexProps } from "@/components/Flex";
export type EmptyIdenticonProps = Omit<FlexProps, "size"> & {
    size: number;
};
export declare const EmptyIdenticon: React.FC<EmptyIdenticonProps>;
