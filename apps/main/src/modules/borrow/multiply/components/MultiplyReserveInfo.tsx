import {
    ComputedReserveData,
    useAssetCap,
    useProtocolDataContext,
} from "@galacticcouncil/money-market/hooks"
import { Text } from "@galacticcouncil/ui/components"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"

import { BorrowInfo } from "@/modules/borrow/reserve/components/BorrowInfo"
import { InterestRateModelChart } from "@/modules/borrow/reserve/components/InterestRateModelChart"
import { ReserveSectionDivider } from "@/modules/borrow/reserve/components/ReserveSectionDivider"
import { SupplyInfo } from "@/modules/borrow/reserve/components/SupplyInfo"

type MultiplyReserveInfoProps = {
    collateralAsset: ComputedReserveData
    debtAsset: ComputedReserveData
}

export const MultiplyReserveInfo: React.FC<MultiplyReserveInfoProps> = ({
    collateralAsset,
    debtAsset,
}) => {
    const { t } = useTranslation(["borrow"])
    const { currentMarketData } = useProtocolDataContext()

    const collateralCaps = useAssetCap(collateralAsset)
    const debtCaps = useAssetCap(debtAsset)

    const showSupplyCapStatus = collateralAsset.supplyCap !== "0"
    const showBorrowCapStatus = debtAsset.borrowCap !== "0"

    const interestRateChartConfig = useMemo(
        () => ({
            baseStableBorrowRate: debtAsset.baseStableBorrowRate,
            baseVariableBorrowRate: debtAsset.baseVariableBorrowRate,
            optimalUsageRatio: debtAsset.optimalUsageRatio,
            stableRateSlope1: debtAsset.stableRateSlope1,
            stableRateSlope2: debtAsset.stableRateSlope2,
            utilizationRate: debtAsset.borrowUsageRatio,
            variableRateSlope1: debtAsset.variableRateSlope1,
            variableRateSlope2: debtAsset.variableRateSlope2,
            stableBorrowRateEnabled: debtAsset.stableBorrowRateEnabled,
            totalLiquidityUSD: debtAsset.totalLiquidityUSD,
            totalDebtUSD: debtAsset.totalDebtUSD,
        }),
        [debtAsset],
    )

    return (
        <>
            <Text fs="p3" fw={500} sx={{ mb: 30 }}>
                {t("borrow:reserve.supplyInfo")} ({collateralAsset.symbol})
            </Text>
            <SupplyInfo
                reserve={collateralAsset}
                currentMarketData={currentMarketData}
                showSupplyCapStatus={showSupplyCapStatus}
                supplyCap={collateralCaps.supplyCap}
                debtCeiling={collateralCaps.debtCeiling}
            />

            <ReserveSectionDivider />

            <Text fs="p3" fw={500} sx={{ mb: 30 }}>
                {t("borrow:reserve.borrowInfo")} ({debtAsset.symbol})
            </Text>
            <BorrowInfo
                reserve={debtAsset}
                currentMarketData={currentMarketData}
                showBorrowCapStatus={showBorrowCapStatus}
                borrowCap={debtCaps.borrowCap}
            />

            <ReserveSectionDivider />

            <Text fs="p3" fw={500} sx={{ mb: 30 }}>
                {t("borrow:reserve.interestRateModel")} ({debtAsset.symbol})
            </Text>
            <InterestRateModelChart config={interestRateChartConfig} />
        </>
    )
}
