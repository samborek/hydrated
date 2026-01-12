import styled from "@emotion/styled"
import { Text } from "@galacticcouncil/ui/components"
import { FC } from "react"

const SStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const SStatCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 20px;
`

const SStatLabel = styled(Text)`
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 8px;
  font-size: 12px;
`

const SStatValue = styled(Text) <{ $highlight?: boolean }>`
  font-size: 24px;
  font-weight: 700;
  font-family: "Gazpacho", sans-serif;
  color: ${({ $highlight }) => $highlight ? '#FF4B8C' : '#fff'};
`

type StatCardProps = {
  label: string
  value: string
  highlight?: boolean
}

const StatCard: FC<StatCardProps> = ({ label, value, highlight }) => (
  <SStatCard>
    <SStatLabel>{label}</SStatLabel>
    <SStatValue $highlight={highlight}>{value}</SStatValue>
  </SStatCard>
)

// Mock data - replace with real data from API
const stats = [
  { label: "Total Value Locked", value: "$183.59M", highlight: true },
  { label: "24h Volume", value: "$10,301,874" },
  { label: "Fee APY (7D)", value: "2.02-29.75%" },
  { label: "HDX Price", value: "$0.0123" },
  { label: "HDX Market Cap", value: "$45.2M" },
  { label: "Transactions (24h)", value: "12,453" },
  { label: "XChain Volume (24h)", value: "$1.2M" },
  { label: "Protocol Revenue (24h)", value: "$45.2K" },
]

export const StatsHeader: FC = () => {
  return (
    <SStatsGrid>
      {stats.map((stat) => (
        <StatCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          highlight={stat.highlight}
        />
      ))}
    </SStatsGrid>
  )
}

