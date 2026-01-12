import Big from "big.js";
import { ComputedReserveData, ComputedUserReserveData, ExtendedFormattedUser } from "@/hooks/commonTypes";
export declare const calculateMaxWithdrawAmount: (user: ExtendedFormattedUser, userReserve: ComputedUserReserveData, poolReserve: ComputedReserveData) => Big.Big;
