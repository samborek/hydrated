import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@galacticcouncil/ui/jsx/jsx-runtime";
import { normalize } from "@aave/math-utils";
import { DollarSign } from "@galacticcouncil/ui/assets/icons";
import { Alert, Flex, Icon, Separator, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow, Text, } from "@galacticcouncil/ui/components";
import { getToken } from "@galacticcouncil/ui/utils";
import { useEffect, useState } from "react";
import { ReserveLogo } from "@/components/primitives/ReserveLogo";
import { useAppDataContext } from "@/hooks/app-data-provider/useAppDataProvider";
import { useAppFormatters } from "@/hooks/app-data-provider/useAppFormatters";
import { useModalContext } from "@/hooks/useModal";
import { useProtocolDataContext } from "@/hooks/useProtocolDataContext";
import { ClaimRewardsActions } from "./ClaimRewardsActions";
import { ClaimRewardsSelect } from "./ClaimRewardsSelect";
export var ErrorType;
(function (ErrorType) {
    ErrorType[ErrorType["NOT_ENOUGH_BALANCE"] = 0] = "NOT_ENOUGH_BALANCE";
})(ErrorType || (ErrorType = {}));
export const ClaimRewardsModalContent = () => {
    const { formatCurrency } = useAppFormatters();
    const { args } = useModalContext();
    const { user, reserves } = useAppDataContext();
    const { currentMarketData } = useProtocolDataContext();
    const [claimableUsd, setClaimableUsd] = useState("0");
    const [selectedRewardSymbol, setSelectedRewardSymbol] = useState("all");
    const [rewards, setRewards] = useState([]);
    const [allReward, setAllReward] = useState();
    // is Network mismatched
    const selectedReward = selectedRewardSymbol === "all"
        ? allReward
        : rewards.find((r) => r.symbol === selectedRewardSymbol);
    const underlyingAssetLower = args?.underlyingAsset?.toLocaleLowerCase();
    // get all rewards
    useEffect(() => {
        const userIncentives = [];
        let totalClaimableUsd = Number(claimableUsd);
        const allAssets = [];
        Object.keys(user.calculatedUserIncentives)
            .filter((rewardTokenAddress) => !underlyingAssetLower ||
            rewardTokenAddress.toLocaleLowerCase() === underlyingAssetLower)
            .forEach((rewardTokenAddress) => {
            const incentive = user.calculatedUserIncentives[rewardTokenAddress];
            const rewardBalance = normalize(incentive.claimableRewards, incentive.rewardTokenDecimals);
            let tokenPrice = 0;
            // getting price from reserves for the native rewards for v2 markets
            if (!currentMarketData.v3 && Number(rewardBalance) > 0) {
                reserves.forEach((reserve) => {
                    if (reserve.isWrappedBaseAsset) {
                        tokenPrice = Number(reserve.priceInUSD);
                    }
                });
            }
            else {
                tokenPrice = Number(incentive.rewardPriceFeed);
            }
            const rewardBalanceUsd = Number(rewardBalance) * tokenPrice;
            if (rewardBalanceUsd > 0) {
                incentive.assets.forEach((asset) => {
                    if (allAssets.indexOf(asset) === -1) {
                        allAssets.push(asset);
                    }
                });
                userIncentives.push({
                    assets: incentive.assets,
                    incentiveControllerAddress: incentive.incentiveControllerAddress,
                    symbol: incentive.rewardTokenSymbol,
                    balance: rewardBalance,
                    balanceUsd: rewardBalanceUsd.toString(),
                    rewardTokenAddress,
                });
                totalClaimableUsd = totalClaimableUsd + Number(rewardBalanceUsd);
            }
        });
        if (userIncentives.length === 1) {
            setSelectedRewardSymbol(userIncentives[0].symbol);
        }
        else if (userIncentives.length > 1 && !selectedReward) {
            const allRewards = {
                assets: allAssets,
                incentiveControllerAddress: userIncentives[0].incentiveControllerAddress,
                symbol: "all",
                balance: "0",
                balanceUsd: totalClaimableUsd.toString(),
                rewardTokenAddress: "",
            };
            setSelectedRewardSymbol("all");
            setAllReward(allRewards);
        }
        setRewards(userIncentives);
        setClaimableUsd(totalClaimableUsd.toString());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const noRewardBalance = claimableUsd === "0";
    const filteredRewards = rewards.filter(({ symbol }) => selectedRewardSymbol === "all" ? true : symbol === selectedRewardSymbol);
    const hasMultipleRewards = rewards.length > 1;
    return (_jsxs(_Fragment, { children: [hasMultipleRewards && (_jsxs(_Fragment, { children: [_jsxs(Flex, { justify: "space-between", align: "center", direction: ["column", "row"], gap: 10, mb: "var(--modal-content-padding)", children: [_jsx(Text, { fs: "p2", fw: 700, lh: 1, children: "Rewards(s) to claim" }), _jsx(ClaimRewardsSelect, { rewards: rewards, selectedReward: selectedRewardSymbol, setSelectedReward: setSelectedRewardSymbol })] }), _jsx(Separator, { mx: "var(--modal-content-inset)" })] })), _jsxs(Stack, { separated: true, separator: _jsx(Separator, { mx: "var(--modal-content-inset)" }), withTrailingSeparator: true, mt: !hasMultipleRewards && "var(--modal-content-inset)", children: [filteredRewards.length > 0 && (_jsx(TableContainer, { my: "var(--modal-content-padding)", borderStyle: "solid", borderWidth: 1, borderColor: getToken("details.separators"), borderRadius: "lg", children: _jsxs(Table, { size: "small", children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Asset" }), _jsx(TableHead, { sx: { textAlign: "end" }, children: "Balance" })] }) }), _jsxs(TableBody, { children: [filteredRewards.map(({ balance, balanceUsd, symbol, rewardTokenAddress }) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsxs(Flex, { align: "center", gap: 6, children: [_jsx(ReserveLogo, { address: rewardTokenAddress }), _jsx(Text, { fs: 14, fw: 600, children: symbol })] }) }), _jsx(TableCell, { children: _jsxs(Flex, { direction: "column", align: "flex-end", children: [_jsx(Text, { fs: 13, fw: 500, children: formatCurrency(balance, { symbol }) }), _jsx(Text, { fs: 12, lh: 1, color: getToken("text.medium"), children: formatCurrency(balanceUsd, {
                                                                    maximumFractionDigits: 2,
                                                                }) })] }) })] }, `claim-${rewardTokenAddress}`))), filteredRewards.length > 1 && (_jsxs(TableRow, { children: [_jsx(TableCell, { children: _jsxs(Flex, { align: "center", gap: 6, children: [_jsx(Icon, { size: 24, component: DollarSign, sx: { scale: 0.75 } }), _jsx(Text, { fs: 14, fw: 600, children: "Total worth" })] }) }), _jsx(TableCell, { children: _jsx(Text, { fs: 15, fw: 600, align: "right", children: formatCurrency(claimableUsd, {
                                                            maximumFractionDigits: 2,
                                                        }) }) })] }))] })] }) })), noRewardBalance && (_jsx(Alert, { variant: "error", sx: { my: 14 }, description: "Your reward balance is 0" }))] }), _jsx(ClaimRewardsActions, { selectedReward: selectedReward ?? {}, blocked: noRewardBalance })] }));
};
