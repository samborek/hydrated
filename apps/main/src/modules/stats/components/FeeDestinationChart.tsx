import styled from "@emotion/styled"
import { Text, ValueStats } from "@galacticcouncil/ui/components"
import { css } from "@galacticcouncil/ui/utils"
import { FC, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const SChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const SChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.scales.paddings.m}px;
`

const SChartWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
`

const SLegend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: ${({ theme }) => theme.scales.paddings.m}px;
`

const SLegendItem = styled.div<{ $isActive?: boolean }>(
  ({ theme, $isActive }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s ease;
    background: ${$isActive
      ? theme.surfaces.containers.dim.dimOnHigh
      : "transparent"};

    &:hover {
      background: ${theme.surfaces.containers.dim.dimOnHigh};
    }
  `,
)

const SLegendColor = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  margin-right: 10px;
  flex-shrink: 0;
`

const SLegendLabel = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`

// Fee destination data based on the documentation
const DESTINATION_DATA = [
  { name: "Treasury", value: 35, description: "Protocol treasury & burns" },
  { name: "LPs & Referrers", value: 30, description: "Liquidity providers & referral rewards" },
  { name: "Protocol", value: 25, description: "Protocol operations" },
  { name: "Stakers", value: 10, description: "HDX staking rewards" },
]

const COLORS = {
  Treasury: "#E53E76",
  "LPs & Referrers": "#22C55E",
  Protocol: "#3B82F6",
  Stakers: "#F59E0B",
}

type Props = {
  title?: string
}

export const FeeDestinationChart: FC<Props> = ({
  title = "Fee Distribution",
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const onPieLeave = () => {
    setActiveIndex(null)
  }

  const onLegendClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <SChartContainer>
      <SChartHeader>
        <ValueStats
          label={title}
          customValue={
            <Text
              fs={24}
              fw={700}
              style={{ fontFamily: "Gazpacho, sans-serif", lineHeight: 1 }}
            >
              Where fees go
            </Text>
          }
          wrap={true}
          size="header"
          style={{ alignItems: "flex-start" }}
        />
      </SChartHeader>

      <SChartWrapper>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={DESTINATION_DATA}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={activeIndex !== null ? 76 : 70}
              paddingAngle={2}
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
            >
              {DESTINATION_DATA.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.name as keyof typeof COLORS]}
                  style={{
                    cursor: "pointer",
                    outline: "none",
                    transform: activeIndex === index ? "scale(1.05)" : "scale(1)",
                    transformOrigin: "center",
                    transition: "transform 0.2s ease",
                  }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </SChartWrapper>

      <SLegend>
        {DESTINATION_DATA.map((entry, index) => (
          <SLegendItem
            key={entry.name}
            $isActive={activeIndex === index}
            onClick={() => onLegendClick(index)}
          >
            <SLegendLabel>
              <SLegendColor $color={COLORS[entry.name as keyof typeof COLORS]} />
              <Text fs={13} color="text.medium">
                {entry.name}
              </Text>
            </SLegendLabel>
            <Text fs={13} fw={600} color="text.high">
              {entry.value}%
            </Text>
          </SLegendItem>
        ))}
      </SLegend>
    </SChartContainer>
  )
}
