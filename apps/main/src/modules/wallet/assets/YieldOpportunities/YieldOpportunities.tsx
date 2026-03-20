import {
  Flex,
  SectionHeader,
  Text,
  Toggle,
} from "@galacticcouncil/ui/components"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"

import { StrategyCard } from "./StrategyCard"
import { YieldOpportunityCard } from "./YieldOpportunityCard"

// Mock data - to be replaced with real API data
const MOCK_YIELD_OPPORTUNITIES = [
  { id: "geth", name: "GETH", apy: "8.49%", liquidity: "1.4m" },
  { id: "gdot", name: "GDOT", apy: "8.49%", liquidity: "1.4m" },
  { id: "crypto-bull", name: "Crypto Bull", apy: "8.49%", liquidity: "1.4m" },
  { id: "crypto-bear", name: "Crypto Bear", apy: "8.49%", liquidity: "1.4m" },
]

const MOCK_FEATURED_STRATEGIES = [
  {
    id: "prime",
    name: "Prime",
    multiplier: "4",
    apy: "8.49%",
    liquidity: "1.4m",
  },
  {
    id: "crypto-bull-strategy",
    name: "Crypto Bull",
    multiplier: "4",
    apy: "8.49%",
    liquidity: "1.4m",
  },
  {
    id: "crypto-bear-strategy",
    name: "Crypto Bear",
    multiplier: "4",
    apy: "8.49%",
    liquidity: "1.4m",
  },
]

const MOCK_HIGH_YIELD_FARMING = [
  { id: "hollar", name: "Hollar", apy: "8.49%", liquidity: "1.4m" },
  { id: "hdx-staking", name: "HDX Staking", apy: "8.49%", liquidity: "1.4m" },
  { id: "geth-farming", name: "GETH", apy: "8.49%", liquidity: "1.4m" },
]

const MOCK_SAVINGS_DCA = [
  { id: "tbtc", name: "TBTC", apy: "8.49%", liquidity: "1.4m" },
  { id: "paxg", name: "PAXG", apy: "8.49%", liquidity: "1.4m" },
]

const MockIcon: FC<{ color?: string }> = ({ color = "#4ADE80" }) => (
  <div
    style={{
      width: 32,
      height: 32,
      borderRadius: "50%",
      background: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  />
)

export const YieldOpportunities: FC = () => {
  const { t } = useTranslation("wallet")
  const [showMyPositions, setShowMyPositions] = useState(false)

  return (
    <Flex direction="column" gap="xl" mt="xxl">
      {/* Yield Opportunities */}
      <div>
        <SectionHeader title={t("yieldOpportunities.title")} />
        <Flex gap="base" sx={{ overflowX: "auto", pb: "s" }}>
          {MOCK_YIELD_OPPORTUNITIES.map((opportunity) => (
            <YieldOpportunityCard
              key={opportunity.id}
              icon={<MockIcon />}
              name={opportunity.name}
              apy={opportunity.apy}
              liquidity={opportunity.liquidity}
            />
          ))}
        </Flex>
      </div>

      {/* Featured Strategies */}
      <div>
        <Flex direction="column" gap="xs" mb="base">
          <SectionHeader title={t("featuredStrategies.title")} noTopPadding />
          <Text fs="p4" color="text.low">
            {t("featuredStrategies.description")}
          </Text>
        </Flex>
        <Flex gap="base" sx={{ overflowX: "auto", pb: "s" }}>
          {MOCK_FEATURED_STRATEGIES.map((strategy) => (
            <StrategyCard
              key={strategy.id}
              icon={<MockIcon color="#F472B6" />}
              name={strategy.name}
              multiplier={strategy.multiplier}
              apy={strategy.apy}
              liquidity={strategy.liquidity}
            />
          ))}
        </Flex>
      </div>

      {/* High Yield Farming */}
      <div>
        <Flex direction="column" gap="xs" mb="base">
          <SectionHeader title={t("highYieldFarming.title")} noTopPadding />
          <Text fs="p4" color="text.low">
            {t("highYieldFarming.description")}
          </Text>
        </Flex>
        <Flex gap="base" sx={{ overflowX: "auto", pb: "s" }}>
          {MOCK_HIGH_YIELD_FARMING.map((farm) => (
            <YieldOpportunityCard
              key={farm.id}
              icon={<MockIcon color="#60A5FA" />}
              name={farm.name}
              apy={farm.apy}
              liquidity={farm.liquidity}
            />
          ))}
        </Flex>
      </div>

      {/* Savings & DCA */}
      <div>
        <Flex align="center" justify="space-between" mb="base">
          <Flex direction="column" gap="xs">
            <SectionHeader title={t("savingsAndDca.title")} noTopPadding />
            <Text fs="p4" color="text.low">
              {t("savingsAndDca.description")}
            </Text>
          </Flex>
          <Flex align="center" gap="s">
            <Text fs="p4">{t("savingsAndDca.showMyPositions")}</Text>
            <Toggle
              name="showMyPositions"
              checked={showMyPositions}
              onCheckedChange={setShowMyPositions}
            />
          </Flex>
        </Flex>
        <Flex gap="base" sx={{ overflowX: "auto", pb: "s" }}>
          {MOCK_SAVINGS_DCA.map((item) => (
            <YieldOpportunityCard
              key={item.id}
              icon={<MockIcon color="#A78BFA" />}
              name={item.name}
              apy={item.apy}
              liquidity={item.liquidity}
            />
          ))}
        </Flex>
      </div>
    </Flex>
  )
}
