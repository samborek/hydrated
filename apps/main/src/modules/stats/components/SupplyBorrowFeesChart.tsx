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
import { ChartTooltipContent, chartCursorStyle } from "./StatsChartTooltip"
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


const getSupplyBorrowFeeTypes = (colors: ReturnType<typeof getFeeColors>) => ({
  liquidationPenalty: { label: "Liquidation Penalty", color: colors.liquidationPenalty },
  pepl: { label: "PEPL", color: colors.pepl },
  assetReserve: { label: "Asset Reserve", color: colors.assetReserve },
} as const)

type FeeType = keyof ReturnType<typeof getSupplyBorrowFeeTypes>

// Generate mock supply/borrow fees data
const generateSupplyBorrowFeesData = (timeRange: TimeRange) => {
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
      liquidationPenalty: (Math.random() * 1200 + 200) * multiplier,
      pepl: (Math.random() * 800 + 100) * multiplier,
      assetReserve: (Math.random() * 600 + 150) * multiplier,
    })
  }

  return data
}

type TimeRange = '1W' | '1M' | '1Y' | 'ALL'
type ChartType = 'line' | 'bar'

export const SupplyBorrowFeesChart: FC = () => {
  const { themeProps: theme } = useTheme()
  const feeColors = getFeeColors(theme)
  const FEE_TYPES = getSupplyBorrowFeeTypes(feeColors)

  const [timeRange, setTimeRange] = useState<TimeRange>('1M')
  const [chartType, setChartType] = useState<ChartType>('line')
  const [activeTypes, setActiveTypes] = useState<FeeType[]>(Object.keys(FEE_TYPES) as FeeType[])

  const feesData = useMemo(() => generateSupplyBorrowFeesData(timeRange), [timeRange])

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
              color={feeColors.supplyBorrowFees}
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
              <linearGradient id="gradLiquidationPenalty" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={FEE_TYPES.liquidationPenalty.color} stopOpacity={0.6} />
                <stop offset="95%" stopColor={FEE_TYPES.liquidationPenalty.color} stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="gradPepl" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={FEE_TYPES.pepl.color} stopOpacity={0.6} />
                <stop offset="95%" stopColor={FEE_TYPES.pepl.color} stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="gradAssetReserve" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={FEE_TYPES.assetReserve.color} stopOpacity={0.6} />
                <stop offset="95%" stopColor={FEE_TYPES.assetReserve.color} stopOpacity={0.1} />
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
            <Tooltip
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
            {activeTypes.includes('liquidationPenalty') && (
              <Area
                type="monotone"
                dataKey="liquidationPenalty"
                stroke={FEE_TYPES.liquidationPenalty.color}
                fill="url(#gradLiquidationPenalty)"
                strokeWidth={2}
                name="liquidationPenalty"
              />
            )}
            {activeTypes.includes('pepl') && (
              <Area
                type="monotone"
                dataKey="pepl"
                stroke={FEE_TYPES.pepl.color}
                fill="url(#gradPepl)"
                strokeWidth={2}
                name="pepl"
              />
            )}
            {activeTypes.includes('assetReserve') && (
              <Area
                type="monotone"
                dataKey="assetReserve"
                stroke={FEE_TYPES.assetReserve.color}
                fill="url(#gradAssetReserve)"
                strokeWidth={2}
                name="assetReserve"
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
            <Tooltip
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
            {activeTypes.includes('liquidationPenalty') && (
              <Bar
                dataKey="liquidationPenalty"
                stackId="a"
                fill={FEE_TYPES.liquidationPenalty.color}
                name="liquidationPenalty"
              />
            )}
            {activeTypes.includes('pepl') && (
              <Bar
                dataKey="pepl"
                stackId="a"
                fill={FEE_TYPES.pepl.color}
                name="pepl"
              />
            )}
            {activeTypes.includes('assetReserve') && (
              <Bar
                dataKey="assetReserve"
                stackId="a"
                fill={FEE_TYPES.assetReserve.color}
                name="assetReserve"
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
