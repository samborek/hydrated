import { ChevronDown, ChevronUp } from "@galacticcouncil/ui/assets/icons"
import {
    Flex,
    Icon,
    Summary,
    SummaryRowValue,
    Text,
} from "@galacticcouncil/ui/components"
import { getToken } from "@galacticcouncil/ui/utils"
import { FC, useState } from "react"
import { useFormContext } from "react-hook-form"

import { SwapSummaryRow } from "@/modules/trade/swap/components/SwapSummaryRow"
import { SwapSectionSeparator } from "@/modules/trade/swap/SwapPage.styled"

import { LimitOrderFormValues } from "./useLimitOrderForm"

export const LimitOrderSummary: FC = () => {
    const [isExpanded, setIsExpanded] = useState(false)
    const { watch } = useFormContext<LimitOrderFormValues>()

    const sellAsset = watch("sellAsset")
    const buyAsset = watch("buyAsset")
    const sellAmount = watch("sellAmount")
    const buyAmount = watch("buyAmount")
    const limitPrice = watch("limitPrice")

    const sellSymbol = sellAsset?.symbol ?? "—"
    const buySymbol = buyAsset?.symbol ?? "—"

    return (
        <>
            <SwapSectionSeparator />
            <Flex
                align="center"
                justify="space-between"
                py="base"
                px="var(--swap-section-padding-inline)"
                mx="var(--swap-section-inset-inline)"
                onClick={() => setIsExpanded(!isExpanded)}
                css={{ cursor: "pointer" }}
            >
                <Text fs="p5" color="text.medium">
                    Total fees:
                </Text>
                <Flex align="center" gap="s">
                    <Text fs="p4" fw={600} color="text.high">
                        $0.12
                    </Text>
                    <Icon
                        size="xs"
                        component={isExpanded ? ChevronUp : ChevronDown}
                        color="text.medium"
                    />
                </Flex>
            </Flex>

            {isExpanded && (
                <Summary separator={<SwapSectionSeparator />}>
                    <SwapSummaryRow
                        label={`Trigger price (${sellSymbol})`}
                        content={limitPrice ? `${Number(limitPrice).toPrecision(6)}` : "—"}
                    />
                    <SwapSummaryRow
                        label="You Sell"
                        content={sellAmount ? `${sellAmount} ${sellSymbol}` : "—"}
                    />
                    <SwapSummaryRow
                        label="To Buy (est.)"
                        content={buyAmount ? `${buyAmount} ${buySymbol}` : "—"}
                    />
                    <SwapSummaryRow
                        label="Platform Fee"
                        content={
                            <SummaryRowValue color={getToken("details.values.positive")}>
                                0.12%
                            </SummaryRowValue>
                        }
                    />
                </Summary>
            )}
        </>
    )
}
