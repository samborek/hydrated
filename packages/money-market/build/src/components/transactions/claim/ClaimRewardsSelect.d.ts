import { Reward } from "@/helpers/types";
export type ClaimRewardsSelectProps = {
    rewards: Reward[];
    setSelectedReward: (key: string) => void;
    selectedReward: string;
};
export declare const ClaimRewardsSelect: React.FC<ClaimRewardsSelectProps>;
