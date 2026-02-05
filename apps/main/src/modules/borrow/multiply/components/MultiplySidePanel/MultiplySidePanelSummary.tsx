import { ComputedReserveData } from "@galacticcouncil/money-market/hooks"
import {
    Box,
    Flex,
    Separator,
    Stack,
    Text,
} from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { getTokenPx } from "@galacticcouncil/ui/utils"
import { ChevronDown } from "lucide-react"
import { FC } from "react"

import { AssetLogo } from "@/components/AssetLogo"
import { getReserveAssetId } from "@/modules/borrow/utils/assets"

export type MultiplySidePanelSummaryProps = {
    collateralAsset: ComputedReserveData
    debtAsset: ComputedReserveData
    leverage: number
    netApy: number
    buyingPower: number
    debtAmount: number
}

const SummaryItem = ({
    label,
    value,
    subValue,
    isWarning,
}: {
    label: string
    value: any
    subValue?: string
    isWarning?: boolean
}) => {
    const { themeProps: theme } = useTheme()
    return (
        <Flex
            justify="space-between"
            align="center"
            py={getTokenPx("containers.paddings.quint")}
        >
            <Text fs="p5" color={theme.text.medium}>
                {label}
            </Text>
            <Box sx={{ textAlign: "right" }}>
                {typeof value === "string" ? (
                    <Text
                        fs="p5"
                        fw={isWarning ? 600 : 500}
                        color={isWarning ? theme.accents.alertAlt.primary : theme.text.high}
                    >
                        {value}
                    </Text>
                ) : (
                    value
                )}
                {subValue && (
                    <Text fs="p6" color={theme.text.medium}>
                        {subValue}
                    </Text>
                )}
            </Box>
        </Flex>
    )
}

const SimpleSummaryRow = ({
    label,
    value,
    showChevron = false,
}: {
    label: string
    value: any
    showChevron?: boolean
}) => {
    const { themeProps: theme } = useTheme()
    return (
        <Flex
            justify="space-between"
            align="center"
            py={getTokenPx("scales.paddings.s")}
        >
            <Text fs="p5" color={theme.text.medium}>
                {label}
            </Text>
            <Flex align="center" gap={getTokenPx("scales.paddings.xs")}>
                <Text fs="p5" fw={500} color={theme.text.high}>
                    {value}
                </Text>
                {showChevron && <ChevronDown size={14} color={theme.text.medium} />}
            </Flex>
        </Flex>
    )
}

export const MultiplySidePanelSummary: FC<MultiplySidePanelSummaryProps> = ({
    collateralAsset,
}) => {
    const { themeProps: theme } = useTheme()

    return (
        <Stack gap={0} mt={getTokenPx("scales.paddings.m")}>
            <Separator mb={getTokenPx("scales.paddings.s")} />

            <SimpleSummaryRow
                label="Total fees"
                value="$5.63"
                showChevron={false} // Hidden for now as requested
            />
            <Separator />

            <SimpleSummaryRow
                label="Minimal received"
                value={`4500.45 ${collateralAsset?.symbol || "PRIME"}`}
            />
            <Separator />

            {/* Yield */}
            <Flex
                justify="space-between"
                align="center"
                py={getTokenPx("containers.paddings.quint")}
            >
                <Text fs="p5" color={theme.text.medium}>
                    Yield
                </Text>
                <Flex align="center" gap={getTokenPx("scales.paddings.xs")}>
                    <Text fs="p5" fw={500} color={theme.accents.success.emphasis}>
                        Up to 16.55%
                    </Text>
                    {collateralAsset && (
                        <AssetLogo id={getReserveAssetId(collateralAsset)} size="small" />
                    )}
                </Flex>
            </Flex>
            <Separator />

            <SimpleSummaryRow
                label="Price"
                value={`1 ${collateralAsset?.symbol || "DOT"} = $1 000`}
            />
            <Separator />

            <SimpleSummaryRow label="Liquidation price" value="0.0566 (-15.45%)" />
            <Separator />

            {/* Health Factor */}
            <SummaryItem
                label="Health factor"
                value="1.88 → 1.58"
                subValue="Liquidation at <1.0"
                isWarning
            />
        </Stack>
    )
}
