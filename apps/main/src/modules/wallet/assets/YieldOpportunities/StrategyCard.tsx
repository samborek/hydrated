import { ArrowRight } from "@galacticcouncil/ui/assets/icons"
import { Flex, Icon, Paper, Text } from "@galacticcouncil/ui/components"
import { getToken } from "@galacticcouncil/ui/utils"
import { FC, ReactNode } from "react"
import { useTranslation } from "react-i18next"

type Props = {
  readonly icon: ReactNode
  readonly name: string
  readonly multiplier: string
  readonly apy: string
  readonly liquidity: string
}

export const StrategyCard: FC<Props> = ({
  icon,
  name,
  multiplier,
  apy,
  liquidity,
}) => {
  const { t } = useTranslation("wallet")

  return (
    <Paper
      sx={{
        p: "l",
        minWidth: "14rem",
        cursor: "pointer",
        transition: "transform 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
        },
      }}
    >
      <Flex direction="column" gap="base">
        <Flex align="center" justify="space-between">
          <Flex align="center" gap="s">
            {icon}
            <Text fs="p3" fw={600}>
              {name}
            </Text>
          </Flex>
          <Flex align="center" gap="xs">
            <Text
              fs="p5"
              fw={600}
              sx={{
                px: "s",
                py: "xs",
                borderRadius: 4,
                background: getToken("colors.accent.700"),
                color: "#fff",
              }}
            >
              {t("featuredStrategies.upTo", { multiplier })}
            </Text>
            <Icon component={ArrowRight} size="s" />
          </Flex>
        </Flex>
        <Flex justify="space-between" gap="xl">
          <Flex direction="column" gap="xs">
            <Text fs="p5" color={getToken("text.low")}>
              {t("yieldOpportunities.netApy")}
            </Text>
            <Text
              fs="p3"
              fw={600}
              color={getToken("accents.success.emphasis")}
              sx={{ textDecoration: "line-through", opacity: 0.5 }}
            >
              {apy}
            </Text>
          </Flex>
          <Flex direction="column" gap="xs" align="flex-end">
            <Text fs="p5" color={getToken("text.low")}>
              {t("featuredStrategies.liquidityAvailable")}
            </Text>
            <Text fs="p3" fw={600}>
              {liquidity}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Paper>
  )
}
