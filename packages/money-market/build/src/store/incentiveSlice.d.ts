import { ReservesIncentiveDataHumanized, UserReservesIncentivesDataHumanized } from "@aave/contract-helpers";
import { StateCreator } from "zustand";
import { RootStore } from "./root";
export interface IncentiveSlice {
    reserveIncentiveData?: ReservesIncentiveDataHumanized[];
    userIncentiveData?: UserReservesIncentivesDataHumanized[];
    refreshIncentiveData: () => Promise<void>;
}
export declare const createIncentiveSlice: StateCreator<RootStore, [
    ["zustand/subscribeWithSelector", never],
    ["zustand/devtools", never]
], [
], IncentiveSlice>;
