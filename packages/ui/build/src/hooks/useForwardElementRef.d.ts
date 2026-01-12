import { Ref } from "react";
export declare const useForwardElementRef: <TRef>(parentRef: Ref<TRef> | undefined) => readonly [import("react").RefObject<TRef | null>, (element: TRef | null) => void];
