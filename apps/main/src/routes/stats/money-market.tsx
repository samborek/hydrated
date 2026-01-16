import {
  Flex,
  SectionHeader,
  Separator,
  ValueStats,
  ValueStatsValue,
} from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { css, styled } from "@galacticcouncil/ui/utils"
import { createFileRoute } from "@tanstack/react-router"

import { MarketsTable } from "@/modules/stats/components/MarketsTable"
import { SupplyBorrowChart } from "@/modules/stats/components/SupplyBorrowChart"

const SPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 0 24px 0;
`

const SSection = styled.section<{ hasHeader?: boolean }>(
  ({ theme, hasHeader }) => css`
    background: ${theme.surfaces.containers.high.primary};
    border: 1px solid ${theme.details.borders};
    border-radius: 16px;
    padding: ${theme.containers.paddings.primary}px;

    @media (max-width: 576px) {
      padding: ${hasHeader ? 0 : theme.containers.paddings.secondary}px
        ${theme.containers.paddings.secondary}px
        ${theme.containers.paddings.secondary}px;
    }
  `,
)

function MoneyMarketStats() {
  const { themeProps: theme } = useTheme()

  return (
    <SPageContainer>
      <SectionHeader as="h1" sx={{ p: 0 }} mb={-12}>
        Money Market
      </SectionHeader>

      <Flex
        gap={20}
        justify="space-between"
        sx={{ py: 10, overflowX: "auto", height: 80 }}
      >
        <ValueStats
          label="Total Value Locked"
          size="large"
          wrap
          customValue={
            <ValueStatsValue size="large" style={{ color: "#F59E0B" }}>
              $12.6M
            </ValueStatsValue>
          }
        />
        <Separator orientation="vertical" sx={{ my: 10, flexShrink: 0 }} />
        <ValueStats
          label="Total Supplied"
          size="large"
          wrap
          customValue={
            <ValueStatsValue
              size="large"
              style={{ color: theme.details.values.positive }}
            >
              $12.6M
            </ValueStatsValue>
          }
        />
        <Separator orientation="vertical" sx={{ my: 10, flexShrink: 0 }} />
        <ValueStats
          label="Total Borrowed"
          size="large"
          wrap
          customValue={
            <ValueStatsValue size="large" style={{ color: "#F59E0B" }}>
              $7.5M
            </ValueStatsValue>
          }
        />
        <Separator orientation="vertical" sx={{ my: 10, flexShrink: 0 }} />
        <ValueStats
          label="Liquidations (24h)"
          size="large"
          wrap
          customValue={
            <ValueStatsValue
              size="large"
              style={{ color: theme.details.values.negative }}
            >
              $45,230
            </ValueStatsValue>
          }
        />
      </Flex>

      <SSection hasHeader>
        <SupplyBorrowChart title="Supply / Borrow History" />
      </SSection>

      <SSection hasHeader>
        <SectionHeader>Markets</SectionHeader>
        <MarketsTable />
      </SSection>
    </SPageContainer>
  )
}

export const Route = createFileRoute("/stats/money-market")({
  component: MoneyMarketStats,
})
