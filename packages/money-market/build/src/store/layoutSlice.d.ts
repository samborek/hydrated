import { StateCreator } from "zustand";
import { RootStore } from "./root";
export type LayoutSlice = {
    setMobileDrawerOpen: (eventName: boolean) => void;
    mobileDrawerOpen: boolean;
};
export declare const createLayoutSlice: StateCreator<RootStore, [
    ["zustand/subscribeWithSelector", never],
    ["zustand/devtools", never]
], [
], LayoutSlice>;
