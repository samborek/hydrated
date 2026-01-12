import { FC } from "react";
import { FlexProps } from "@/components/Flex";
export type TalismanIdenticonProps = FlexProps & {
    address: string;
    size: number;
};
export declare const TalismanIdenticon: FC<TalismanIdenticonProps>;
