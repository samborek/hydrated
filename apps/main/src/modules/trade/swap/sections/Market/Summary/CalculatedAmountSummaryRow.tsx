import { ChevronDown, ChevronUp } from "@galacticcouncil/ui/assets/icons"
import {
  Box,
  Flex,
  Icon,
  Text,
} from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { getToken, getTokenRem } from "@galacticcouncil/ui/utils"
import { FC, ReactNode } from "react"
import { useTranslation } from "react-i18next"

import { SwapSummaryRow } from "@/modules/trade/swap/components/SwapSummaryRow"
import { useTradeSettings } from "@/states/tradeSettings"

type Props = {
  readonly label: string
  readonly tooltip: string
  readonly amount: ReactNode
  readonly isExpanded: boolean
  readonly onIsExpandedChange: (isExpanded: boolean) => void
}

export const CalculatedAmountSummaryRow: FC<Props> = ({
  label,
  tooltip,
  amount,
  isExpanded,
  onIsExpandedChange,
}) => {
  const { t } = useTranslation(["common", "trade"])
  const { themeProps } = useTheme()

  const {
    swap: {
      single: { swapSlippage },
      split: { twapSlippage },
    },
  } = useTradeSettings()

  return (
    <SwapSummaryRow
      label={label}
      content={
        <Flex align="center" gap={getTokenRem("scales.paddings.s")(themeProps as any)}>
          {typeof amount === "string" ? (
            <Text
              fw={500}
              fs="p2"
              lh="1.3125rem"
              color={getToken("text.high")}
            >
              {amount}
            </Text>
          ) : (
            amount
          )}
          <Icon
            component={isExpanded ? ChevronUp : ChevronDown}
            size={20}
            color={getToken("icons.onContainer")}
          />
        </Flex>
      }
      onClick={(e) => {
        e.preventDefault()
        onIsExpandedChange(!isExpanded)
      }}
      tooltip={
        <Flex direction="column" gap={getTokenRem("scales.paddings.base")(themeProps as any)}>
          <Box>{tooltip}</Box>
          <Box>
            <Flex justify="space-between">
              <Box>
                {t("trade:market.summary.calculatedAmount.tooltip.single")}
              </Box>
              <Box>{t("percent", { value: swapSlippage })}</Box>
            </Flex>
            <Flex justify="space-between">
              <Box>
                {t("trade:market.summary.calculatedAmount.tooltip.split")}
              </Box>
              <Box>{t("percent", { value: twapSlippage })}</Box>
            </Flex>
          </Box>
        </Flex>
      }
    />
  )
}
