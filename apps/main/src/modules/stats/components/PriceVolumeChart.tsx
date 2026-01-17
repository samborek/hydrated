import styled from "@emotion/styled"
import { Text, ValueStats } from "@galacticcouncil/ui/components"
import { SelectDropdown } from "./SelectDropdown"
import { TimeRangeToggle } from "@galacticcouncil/ui/components/TimeRangeToggle"
import { FC, useState, useMemo } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts"
import { ChartTooltipContent, chartCursorStyle } from "./StatsChartTooltip"
import { css } from "@galacticcouncil/ui/utils"
import { useTheme } from "@galacticcouncil/ui/theme"

const SChartContainer = styled.div`
  width: 100%;
`

const SChartHeader = styled.div`
  margin-bottom: 8px;
`


const SToggleGroup = styled.div(
  ({ theme }) => css`
    display: flex;
    background: ${theme.surfaces.containers.high.primary};
    border-radius: 8px;
    padding: 4px;
    border: 1px solid ${theme.details.borders};
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

@media (max-width: 576px) {
  display: none;
}
`

const SMobileTimeWrapper = styled.div`
  display: none;
  width: 100%;
  
  @media (max-width: 576px) {
    display: block;
  }
`








const SControlsFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  flex-wrap: wrap;
  gap: 16px;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    
    > *:last-child {
      width: 100%;
      justify-content: space-between;
    }
  }
`


// Generate mock price data
const generatePriceData = () => {
  const data = []
  const now = Date.now()
  const dayMs = 24 * 60 * 60 * 1000

  let price = 0.012

  for (let i = 30; i >= 0; i--) {
    const date = new Date(now - i * dayMs)
    price = price + (Math.random() - 0.48) * 0.001
    price = Math.max(0.008, Math.min(0.018, price))

    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      price: price,
      volume: Math.random() * 500000 + 100000,
    })
  }

  return data
}

type ChartType = 'price' | 'volume'
type TimeRange = 'ALL' | '1D' | '1W' | '1M'

type Props = {
  title?: string
  showToggle?: boolean
  defaultType?: ChartType
}

export const PriceVolumeChart: FC<Props> = ({
  title,
  showToggle = true,
  defaultType = 'price'
}) => {
  const [chartType, setChartType] = useState<ChartType>(defaultType)
  const [timeRange, setTimeRange] = useState<TimeRange>('1D')

  // Generate data once with useMemo to avoid regenerating on every render
  const priceData = useMemo(() => generatePriceData(), [])

  const latestPrice = priceData[priceData.length - 1]?.price || 0

  const { themeProps: theme } = useTheme()

  return (
    <SChartContainer>
      <SChartHeader>
        {title && <Text fs={14} fw={500} color="rgba(255,255,255,0.6)" className="mb-1">{title}</Text>}
        <ValueStats
          label={chartType === 'price' ? 'Price' : 'Volume'}
          value={chartType === 'price'
            ? `${latestPrice.toFixed(9)} HDX`
            : `$${((priceData[priceData.length - 1]?.volume ?? 0) / 1000).toFixed(0)} K`
          }
          wrap={true}
          size="header"
          style={{ alignItems: 'flex-start' }}
        />
      </SChartHeader>


      <ResponsiveContainer width="100%" height={280}>
        {chartType === 'price' ? (
          <LineChart data={priceData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.details.separators} />
            <XAxis
              dataKey="date"
              tick={{ fill: theme.text.medium, fontSize: 11 }}
              axisLine={{ stroke: theme.details.separators }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: theme.text.medium, fontSize: 11 }}
              axisLine={{ stroke: theme.details.separators }}
              tickLine={false}
              tickFormatter={(value) => `$${value.toFixed(3)} `}
              domain={['auto', 'auto']}
            />
            <Tooltip
              content={({ active, payload, label }) => (
                <ChartTooltipContent
                  active={active}
                  payload={payload as any}
                  label={label}
                  valueFormatter={(v) => `$${v.toFixed(6)}`}
                />
              )}
              cursor={chartCursorStyle}
            />
            <Legend
              verticalAlign="bottom"
              align="left"
              wrapperStyle={{ paddingTop: '20px' }}
              content={({ payload }: any) => (
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                  {payload?.map((entry: any, index: number) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          width: '12px',
                          height: '12px',
                          backgroundColor: entry.color,
                          borderRadius: '4px'
                        }}
                      />
                      <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>
                        {entry.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#4CAF50"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#4CAF50' }}
              name="Price"
            />
          </LineChart>
        ) : (
          <BarChart data={priceData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.details.separators} />
            <XAxis
              dataKey="date"
              tick={{ fill: theme.text.medium, fontSize: 11 }}
              axisLine={{ stroke: theme.details.separators }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: theme.text.medium, fontSize: 11 }}
              axisLine={{ stroke: theme.details.separators }}
              tickLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)} K`}
            />
            <Tooltip
              content={({ active, payload, label }) => (
                <ChartTooltipContent
                  active={active}
                  payload={payload as any}
                  label={label}
                  valueFormatter={(v) => `$${v.toLocaleString()}`}
                />
              )}
              cursor={chartCursorStyle}
            />
            <Legend
              verticalAlign="bottom"
              align="left"
              wrapperStyle={{ paddingTop: '20px' }}
              content={({ payload }: any) => (
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                  {payload?.map((entry: any, index: number) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          width: '12px',
                          height: '12px',
                          backgroundColor: entry.color,
                          borderRadius: '4px'
                        }}
                      />
                      <span style={{ color: theme.text.medium, fontSize: '12px' }}>
                        {entry.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            />
            <Bar
              dataKey="volume"
              fill="rgba(59, 130, 246, 0.6)"
              radius={[2, 2, 0, 0]}
              name="Volume"
            />
          </BarChart>
        )}
      </ResponsiveContainer>

      <SControlsFooter>
        {showToggle ? (
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
        ) : <div />}

        <STimeRangeGroup>
          <TimeRangeToggle
            value={timeRange}
            items={['ALL', '1D', '1W', '1M']}
            onValueChange={(v: string) => setTimeRange(v as TimeRange)}
          />
        </STimeRangeGroup>

        <SMobileTimeWrapper>
          <SelectDropdown
            value={timeRange}
            items={['ALL', '1D', '1W', '1M'].map(range => ({ key: range, label: range }))}
            onValueChange={(val: string) => setTimeRange(val as TimeRange)}
          />
        </SMobileTimeWrapper>
      </SControlsFooter>
    </SChartContainer>
  )
}
