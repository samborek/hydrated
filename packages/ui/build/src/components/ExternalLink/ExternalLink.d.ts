import { AnchorHTMLAttributes, FC, Ref } from "react";
type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    readonly ref?: Ref<HTMLAnchorElement>;
};
export declare const ExternalLink: FC<ExternalLinkProps>;
export {};
