import React from "react";
export interface BasicModalProps {
    title: string;
    open: boolean;
    children: React.ReactNode;
    setOpen: (value: boolean) => void;
}
export declare const BasicModal: ({ title, open, setOpen, children, }: BasicModalProps) => React.JSX.Element;
