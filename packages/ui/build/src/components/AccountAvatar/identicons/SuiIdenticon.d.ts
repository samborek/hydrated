import { FlexProps } from "@/components/Flex";
export type SuiIdenticonProps = Omit<FlexProps, "size"> & {
    size: number;
};
export declare const SuiIdenticon: React.FC<SuiIdenticonProps>;
