import styled from "@emotion/styled"
import { Text } from "@galacticcouncil/ui/components"
import { FC, useState } from "react"
import { css } from "@galacticcouncil/ui/utils"
const SChartContainer = styled.div`
  width: 100%;
`

const SChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const SToggleGroup = styled.div(
  ({ theme }) => css`
    display: flex;
    background: ${theme.surfaces.containers.high.primary};
    border: 1px solid ${theme.details.borders};
    border-radius: 8px;
    padding: 4px;
  `
)

const SToggleButton = styled.button<{ $active?: boolean }>(
  ({ theme, $active }) => css`
    padding: 6px 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
    transition: all 0.2s;
    background: ${$active ? theme.secondaryColors.blues.vibrantBlue : 'transparent'};
    color: ${$active ? '#000000' : theme.text.medium};
    
    &:hover {
      color: ${$active ? '#000000' : theme.text.high};
    }
  `
)

const STimeRangeGroup = styled.div`
  display: flex;
  gap: 8px;
`

const STimeButton = styled.button<{ $active?: boolean }>(
  ({ theme, $active }) => css`
    padding: 6px 12px;
    border: 1px solid ${$active ? theme.details.borders : 'transparent'};
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
    background: ${$active ? theme.surfaces.containers.high.hover : 'transparent'};
    color: ${$active ? theme.text.high : theme.text.medium};
  
    &:hover {
      color: ${theme.text.high};
    }
  `
)

const SChartPlaceholder = styled.div`
  height: 300px;
  background: linear-gradient(180deg, rgba(76, 175, 80, 0.1) 0%, transparent 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60%;
    background: linear-gradient(180deg, 
      transparent 0%, 
      rgba(76, 175, 80, 0.15) 30%, 
      rgba(76, 175, 80, 0.25) 50%,
      rgba(76, 175, 80, 0.1) 100%
    );
    clip-path: polygon(
      0% 100%,
      5% 70%, 10% 75%, 15% 60%, 20% 65%, 25% 55%, 
      30% 60%, 35% 50%, 40% 55%, 45% 45%, 50% 50%,
      55% 40%, 60% 45%, 65% 35%, 70% 40%, 75% 30%,
      80% 35%, 85% 25%, 90% 30%, 95% 20%, 100% 25%,
      100% 100%
    );
  }
`

const SChartValue = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
`

export const StatsChart: FC = () => {
  const [chartType, setChartType] = useState<'price' | 'volume'>('price')
  const [timeRange, setTimeRange] = useState<'1D' | '1W' | '1M' | 'ALL'>('1D')

  return (
    <SChartContainer>
      <SChartHeader>
        <SToggleGroup>
          <SToggleButton
            $active={chartType === 'price'}
            onClick={() => setChartType('price')}
          >
            Price
          </SToggleButton>
          <SToggleButton
            $active={chartType === 'volume'}
            onClick={() => setChartType('volume')}
          >
            Volume
          </SToggleButton>
        </SToggleGroup>

        <STimeRangeGroup>
          {(['ALL', '1D', '1W', '1M'] as const).map((range) => (
            <STimeButton
              key={range}
              $active={timeRange === range}
              onClick={() => setTimeRange(range)}
            >
              {range}
            </STimeButton>
          ))}
        </STimeRangeGroup>
      </SChartHeader>

      <SChartPlaceholder>
        <SChartValue>
          <Text fs={12} color="text.medium">
            {chartType === 'price' ? 'Price' : 'Volume'}
          </Text>
          <Text fs={24} fw={600}>
            0.000000345 HDX
          </Text>
        </SChartValue>
        <Text color="text.medium" fs={14}>
          Chart visualization (integrate with charting library)
        </Text>
      </SChartPlaceholder>
    </SChartContainer>
  )
}
