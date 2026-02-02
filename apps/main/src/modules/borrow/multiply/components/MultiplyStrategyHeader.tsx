import { ComputedReserveData } from "@galacticcouncil/money-market/hooks"
import { Flex, Text, ValueStats } from "@galacticcouncil/ui/components"
import { getToken, getTokenPx } from "@galacticcouncil/ui/utils"
import { FC } from "react"

import { AssetLogo } from "@/components/AssetLogo"

export type MultiplyStrategyHeaderProps = {
    collateralAsset: ComputedReserveData
    debtAsset: ComputedReserveData
}

export const MultiplyStrategyHeader: FC<MultiplyStrategyHeaderProps> = ({
    collateralAsset,
    debtAsset,
}) => {
    return (
        <Flex
            id="multiply-strategy-header"
            justify="space-between"
            sx={{
                pt: getTokenPx(["scales.paddings.base", "containers.paddings.primary"]),
                pb: getTokenPx("scales.paddings.xl"),
            }}
        >
            <Flex gap={getTokenPx("scales.paddings.m")} align="center" wrap>
                <AssetLogo id={[collateralAsset.id, debtAsset.id]} size="large" />

                <Flex direction="column">
                    <Text font="primary" fw={700} fs="h5" lh="130%">
                        {collateralAsset.symbol} / {debtAsset.symbol} Loop
                    </Text>

                    <Text fs="p3" color={getToken("text.medium")}>
                        Supply {collateralAsset.symbol} and borrow {debtAsset.symbol} to
                        amplify yield.
                    </Text>
                </Flex>
            </Flex>

            <ValueStats
                label="Total Value Locked"
                value="$2.4M"
                size="large"
                wrap
                style={{ alignItems: "flex-end" }}
            />
        </Flex>
    )
}
