import { css } from "@galacticcouncil/ui/utils"
import { Flex, Separator, ValueStats, ValueStatsValue } from "@galacticcouncil/ui/components"
import { FC, Fragment } from "react"
import { useTheme } from "@galacticcouncil/ui/theme"

type StatCardProps = {
  label: string
  value: string
  highlight?: boolean
}

// Mock data - replace with real data from API
const stats = [
  { label: "Total Value Locked", value: "$183.59M", highlight: true },
  { label: "24h Volume", value: "$10.3M" },
  { label: "Fee APY (7D)", value: "2.02-29.75%" },
  { label: "Transactions (24h)", value: "12,453" },
  { label: "Protocol Revenue (24h)", value: "$45.2K" },
]

export const StatsHeader: FC = () => {
  const { themeProps: theme } = useTheme()

  return (
    <Flex gap={20} justify="space-between" sx={{ py: 10, overflowX: 'auto', height: 80 }}>
      {stats.map((stat, index) => (
        <Fragment key={stat.label}>
          <ValueStats
            label={stat.label}
            size="large"
            wrap
            value={!stat.highlight ? stat.value : undefined}
            customValue={stat.highlight ? (
              <ValueStatsValue size="large" style={{ color: theme.secondaryColors.pink.coralPink }}>
                {stat.value}
              </ValueStatsValue>
            ) : undefined}
          />
          {index < stats.length - 1 && (
            <Separator orientation="vertical" sx={{ my: 10, flexShrink: 0 }} />
          )}
        </Fragment>
      ))}
    </Flex>
  )
}
