import { Flex, Paper, Text } from "@galacticcouncil/ui/components"
import { getToken } from "@galacticcouncil/ui/utils"
import { FC, ReactNode } from "react"
import { useTranslation } from "react-i18next"

type Props = {
  readonly icon: ReactNode
  readonly name: string
  readonly apy: string
  readonly liquidity: string
}

export const YieldOpportunityCard: FC<Props> = ({
  icon,
  name,
  apy,
  liquidity,
}) => {
  const { t } = useTranslation("wallet")

  return (
    <Paper
      sx={{
        p: "l",
        minWidth: "12rem",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
        },
      }}
    >
      <Flex direction="column" gap="base">
        <Flex align="center" gap="s">
          {icon}
          <Text fs="p3" fw={600}>
            {name}
          </Text>
        </Flex>
        <Flex justify="space-between" gap="xl">
          <Flex direction="column" gap="xs">
            <Text fs="p5" color={getToken("text.low")}>
              {t("yieldOpportunities.netApy")}
            </Text>
            <Text fs="p3" fw={600} color={getToken("accents.success.emphasis")}>
              {apy}
            </Text>
          </Flex>
          <Flex direction="column" gap="xs" align="flex-end">
            <Text fs="p5" color={getToken("text.low")}>
              {t("yieldOpportunities.liquidity")}
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
