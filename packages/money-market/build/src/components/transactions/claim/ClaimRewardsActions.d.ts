import { Reward } from "@/helpers/types";
export type ClaimRewardsActionsProps = {
    blocked: boolean;
    selectedReward: Reward;
};
export declare const ClaimRewardsActions: ({ blocked, selectedReward, }: ClaimRewardsActionsProps) => import("react").JSX.Element;
