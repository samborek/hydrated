import styled from "@emotion/styled"
import { css } from "@galacticcouncil/ui/utils"
import { Button, Flex, Text, Checkbox, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@galacticcouncil/ui/components"
import { FC, useState, useMemo } from "react"
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts"
import { ChevronDown } from "lucide-react"
import { ChartTooltipContent, chartCursorStyle } from "./StatsChartTooltip"
import { useTheme } from "@galacticcouncil/ui/theme"



const SChartContainer = styled.div`
  width: 100%;
`

const SChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
`

const SControlsGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  align-self: center;
  flex-wrap: wrap;
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


// Fee types in Trading Fees
const FEE_TYPES = {
    omnipoolAsset: { label: 'Omnipool Asset Fee', color: '#3B82F6' },
    omnipoolProtocol: { label: 'Omnipool Protocol Fee', color: '#8B5CF6' },
    stablepools: { label: 'Stablepools', color: '#F59E0B' },
    xykTrade: { label: 'XYK Trade Fee', color: '#EC4899' },
} as const

type FeeType = keyof typeof FEE_TYPES

// Generate mock trading fees data
const generateTradingFeesData = (timeRange: TimeRange) => {
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
            omnipoolAsset: (Math.random() * 2000 + 800) * multiplier,
            omnipoolProtocol: (Math.random() * 1500 + 600) * multiplier,
            stablepools: (Math.random() * 800 + 200) * multiplier,
            xykTrade: (Math.random() * 400 + 100) * multiplier,
        })
    }

    return data
}

type TimeRange = '1W' | '1M' | '1Y' | 'ALL'

export const TradingFeesChart: FC = () => {
    const [timeRange, setTimeRange] = useState<TimeRange>('1M')
    const [activeTypes, setActiveTypes] = useState<FeeType[]>(Object.keys(FEE_TYPES) as FeeType[])

    const feesData = useMemo(() => generateTradingFeesData(timeRange), [timeRange])

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

    const { themeProps: theme } = useTheme()

    return (
        <SChartContainer>
            <SChartHeader>
                <div>
                    <Text fs={24} fw={700} color="#3B82F6" style={{ fontFamily: 'Gazpacho, sans-serif' }}>
                        ${(total / 1000).toFixed(2)}K
                    </Text>
                    <Text fs={12} color="text.medium">
                        Latest period total
                    </Text>
                </div>
                <SControlsGroup>
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
                    <Flex gap={6}>
                        {(['1W', '1M', '1Y', 'ALL'] as TimeRange[]).map((range) => (
                            <Button
                                key={range}
                                size="small"
                                variant={timeRange === range ? 'secondary' : 'tertiary'}
                                outline={timeRange !== range}
                                onClick={() => setTimeRange(range)}
                                sx={{ px: 12, minWidth: 42 }}
                            >
                                {range}
                            </Button>
                        ))}
                    </Flex>
                </SControlsGroup>
            </SChartHeader>

            <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={feesData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="gradOmnipoolAsset" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="gradOmnipoolProtocol" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="gradStablepools" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="gradXykTrade" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#EC4899" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#EC4899" stopOpacity={0.1} />
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
                    {activeTypes.includes('omnipoolAsset') && (
                        <Area
                            type="monotone"
                            dataKey="omnipoolAsset"
                            stroke="#3B82F6"
                            fill="url(#gradOmnipoolAsset)"
                            strokeWidth={2}
                            name="omnipoolAsset"
                        />
                    )}
                    {activeTypes.includes('omnipoolProtocol') && (
                        <Area
                            type="monotone"
                            dataKey="omnipoolProtocol"
                            stroke="#8B5CF6"
                            fill="url(#gradOmnipoolProtocol)"
                            strokeWidth={2}
                            name="omnipoolProtocol"
                        />
                    )}
                    {activeTypes.includes('stablepools') && (
                        <Area
                            type="monotone"
                            dataKey="stablepools"
                            stroke="#F59E0B"
                            fill="url(#gradStablepools)"
                            strokeWidth={2}
                            name="stablepools"
                        />
                    )}
                    {activeTypes.includes('xykTrade') && (
                        <Area
                            type="monotone"
                            dataKey="xykTrade"
                            stroke="#EC4899"
                            fill="url(#gradXykTrade)"
                            strokeWidth={2}
                            name="xykTrade"
                        />
                    )}
                </AreaChart>
            </ResponsiveContainer>
        </SChartContainer>
    )
}
