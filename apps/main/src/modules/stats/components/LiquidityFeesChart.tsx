import styled from "@emotion/styled"
import { css } from "@galacticcouncil/ui/utils"
import { Button, Text, Checkbox, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, ToggleGroup, ToggleGroupItem, ValueStats } from "@galacticcouncil/ui/components"
import { SelectDropdown } from "./SelectDropdown"
import { TimeRangeToggle } from "@galacticcouncil/ui/components/TimeRangeToggle"
import { FC, useState, useMemo } from "react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { ChevronDown, BarChart2, TrendingUp } from "lucide-react"
import { ChartTooltipContent, chartCursorStyle, chartTooltipProps } from "./StatsChartTooltip"
import { useTheme } from "@galacticcouncil/ui/theme"
import { getFeeColors } from "@/modules/stats/utils/feeColors"
import { SChartHeader } from "./ChartLayout"



const SChartContainer = styled.div`
  width: 100%;
`

const SControlsGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  align-self: center;
  flex-wrap: wrap;
  
  @media (max-width: 576px) {
    display: none;
  }
`

const SChartFooter = styled.div`
  display: none;
  
  @media (max-width: 576px) {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    margin-top: 16px;
    align-items: center;
    flex-wrap: wrap;
  }
`




// Figma-based filter button: pill shape, subtle background
const SFilterBtn = styled.button(
  ({ theme }) => css`
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 8px 14px;
        background: ${theme.surfaces.containers.high.primary};
        border: 1px solid ${theme.details.borders};
        border-radius: 32px;
        color: ${theme.text.medium};
        font-size: 14px;
        font-weight: 400;
        cursor: pointer;
        transition: background 0.15s ease;

        &:hover {
            background: ${theme.surfaces.containers.high.hover};
            color: ${theme.text.high};
        }
    `
)

// Figma-based filter item row
const SFilterItem = styled.div(
  ({ theme }) => css`
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 8px;
      min-width: 100px;
      border-radius: 32px;
      cursor: pointer;
      transition: background 0.15s ease;

      &:hover {
          background: ${theme.surfaces.containers.high.hover};
      }
    `
)


const getLiquidityFeeTypes = (colors: ReturnType<typeof getFeeColors>) => ({
  omnipoolWithdraw: { label: "Omnipool Withdraw Fee", color: colors.omnipoolWithdrawFee },
  isolatedPoolTrade: { label: "Isolated Pool Trade Fee", color: colors.isolatedPoolTradeFee },
} as const)

type FeeType = keyof ReturnType<typeof getLiquidityFeeTypes>

// Generate mock liquidity fees data
const generateLiquidityFeesData = (timeRange: TimeRange) => {
  const data = []
  const now = new Date()

  const isWeekly = timeRange === '1Y' || timeRange === 'ALL'
  const days = timeRange === '1W' ? 7 : timeRange === '1M' ? 30 : timeRange === '1Y' ? 52 : 104
  const step = isWeekly ? 7 : 1

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - (i * step))

    const multiplier = isWeekly ? 7 : 1

    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      omnipoolWithdraw: (Math.random() * 500 + 100) * multiplier,
      isolatedPoolTrade: (Math.random() * 300 + 50) * multiplier,
    })
  }

  return data
}

type TimeRange = '1W' | '1M' | '1Y' | 'ALL'
type ChartType = 'line' | 'bar'

export const LiquidityFeesChart: FC = () => {
  const { themeProps: theme } = useTheme()
  const feeColors = getFeeColors(theme)
  const FEE_TYPES = getLiquidityFeeTypes(feeColors)

  const [timeRange, setTimeRange] = useState<TimeRange>('1M')
  const [chartType, setChartType] = useState<ChartType>('line')
  const [activeTypes, setActiveTypes] = useState<FeeType[]>(Object.keys(FEE_TYPES) as FeeType[])

  const feesData = useMemo(() => generateLiquidityFeesData(timeRange), [timeRange])

  const toggleFeeType = (type: FeeType) => {
    setActiveTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  // Calculate total for active types
  const latestData = feesData[feesData.length - 1]
  const total = activeTypes.reduce((acc, type) => acc + (latestData?.[type] || 0), 0)

  return (
    <SChartContainer>
      <SChartHeader>
        <ValueStats
          customValue={
            <Text
              fs={24}
              fw={700}
              color={feeColors.liquidityFees}
              style={{ fontFamily: "Gazpacho, sans-serif", lineHeight: 1 }}
            >
              ${(total / 1000).toFixed(2)}K
            </Text>
          }
          bottomLabel="Latest period total"
          size="header"
          style={{ justifyContent: 'flex-start' }}
        />
        <SControlsGroup>
          <ToggleGroup
            size="small"
            type="single"
            value={chartType}
            onValueChange={(v: string) => v && setChartType(v as ChartType)}
          >
            <ToggleGroupItem value="line">
              <TrendingUp size={16} />
            </ToggleGroupItem>
            <ToggleGroupItem value="bar">
              <BarChart2 size={16} />
            </ToggleGroupItem>
          </ToggleGroup>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <SFilterBtn>
                Filter ({activeTypes.length}/{Object.keys(FEE_TYPES).length})
                <ChevronDown size={14} />
              </SFilterBtn>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {(Object.entries(FEE_TYPES) as [FeeType, typeof FEE_TYPES[FeeType]][]).map(([key, { label, color }]) => (
                <DropdownMenuItem
                  key={key}
                  onSelect={(e) => e.preventDefault()}
                >
                  <SFilterItem onClick={() => toggleFeeType(key)}>
                    <Checkbox
                      checked={activeTypes.includes(key)}
                      onCheckedChange={() => toggleFeeType(key)}
                    />
                    <span style={{ color, fontSize: 14 }}>{label}</span>
                  </SFilterItem>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <TimeRangeToggle
            value={timeRange}
            items={['1W', '1M', '1Y', 'ALL']}
            onValueChange={(v: string) => setTimeRange(v as TimeRange)}
          />
        </SControlsGroup>
      </SChartHeader>

      <ResponsiveContainer width="100%" height={280}>
        {chartType === 'line' ? (
          <AreaChart data={feesData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gradOmnipoolWithdraw" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={FEE_TYPES.omnipoolWithdraw.color} stopOpacity={0.6} />
                <stop offset="95%" stopColor={FEE_TYPES.omnipoolWithdraw.color} stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="gradIsolatedPoolTrade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={FEE_TYPES.isolatedPoolTrade.color} stopOpacity={0.6} />
                <stop offset="95%" stopColor={FEE_TYPES.isolatedPoolTrade.color} stopOpacity={0.1} />
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
              tickFormatter={(value) => `$${(value / 1000).toFixed(1)}K`}
            />
            <Tooltip {...chartTooltipProps}
              content={({ active, payload, label }) => (
                <ChartTooltipContent
                  active={active}
                  payload={payload as any}
                  label={label}
                  valueFormatter={(v) => `$${v.toFixed(2)}`}
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
                        {FEE_TYPES[entry.value as FeeType]?.label || entry.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            />
            {activeTypes.includes('omnipoolWithdraw') && (
              <Area
                type="monotone"
                dataKey="omnipoolWithdraw"
                stroke={FEE_TYPES.omnipoolWithdraw.color}
                fill="url(#gradOmnipoolWithdraw)"
                strokeWidth={2}
                name="omnipoolWithdraw"
              />
            )}
            {activeTypes.includes('isolatedPoolTrade') && (
              <Area
                type="monotone"
                dataKey="isolatedPoolTrade"
                stroke={FEE_TYPES.isolatedPoolTrade.color}
                fill="url(#gradIsolatedPoolTrade)"
                strokeWidth={2}
                name="isolatedPoolTrade"
              />
            )}
          </AreaChart>
        ) : (
          <BarChart data={feesData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
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
              tickFormatter={(value) => `$${(value / 1000).toFixed(1)}K`}
            />
            <Tooltip {...chartTooltipProps}
              content={({ active, payload, label }) => (
                <ChartTooltipContent
                  active={active}
                  payload={payload as any}
                  label={label}
                  valueFormatter={(v) => `$${v.toFixed(2)}`}
                />
              )}
              cursor={{ fill: theme.surfaces.containers.high.hover }}
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
                        {FEE_TYPES[entry.value as FeeType]?.label || entry.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            />
            {activeTypes.includes('omnipoolWithdraw') && (
              <Bar
                dataKey="omnipoolWithdraw"
                stackId="a"
                fill={FEE_TYPES.omnipoolWithdraw.color}
                name="omnipoolWithdraw"
              />
            )}
            {activeTypes.includes('isolatedPoolTrade') && (
              <Bar
                dataKey="isolatedPoolTrade"
                stackId="a"
                fill={FEE_TYPES.isolatedPoolTrade.color}
                name="isolatedPoolTrade"
              />
            )}
          </BarChart>
        )}
      </ResponsiveContainer>

      <SChartFooter>
        <div style={{ flex: 1 }}>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button size="medium" variant="tertiary" outline style={{ width: '100%', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>Filter</span>
                  <span style={{ opacity: 0.6, fontSize: 10 }}>({activeTypes.length})</span>
                </div>
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent style={{ width: '200px' }}>
              {(Object.entries(FEE_TYPES) as [FeeType, typeof FEE_TYPES[FeeType]][]).map(([key, { label, color }]) => (
                <DropdownMenuItem key={key} onSelect={(e) => e.preventDefault()}>
                  <SFilterItem onClick={() => toggleFeeType(key)}>
                    <Checkbox checked={activeTypes.includes(key)} onCheckedChange={() => toggleFeeType(key)} />
                    <span style={{ color, fontSize: 12 }}>{label}</span>
                  </SFilterItem>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <ToggleGroup
          size="small"
          type="single"
          value={chartType}
          onValueChange={(v: string) => v && setChartType(v as ChartType)}
        >
          <ToggleGroupItem value="line" style={{ padding: 8 }}>
            <TrendingUp size={16} />
          </ToggleGroupItem>
          <ToggleGroupItem value="bar" style={{ padding: 8 }}>
            <BarChart2 size={16} />
          </ToggleGroupItem>
        </ToggleGroup>

        <div style={{ flex: 1 }}>
          <SelectDropdown
            value={timeRange}
            onValueChange={(val: string) => setTimeRange(val as TimeRange)}
            items={(['1W', '1M', '1Y', 'ALL'] as TimeRange[]).map(range => ({ key: range, label: range }))}
          />
        </div>
      </SChartFooter>
    </SChartContainer>
  )
}
