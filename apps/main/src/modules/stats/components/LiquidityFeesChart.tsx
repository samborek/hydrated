import styled from "@emotion/styled"
import { css } from "@galacticcouncil/ui/utils"
import { Button, Flex, Text, Checkbox, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@galacticcouncil/ui/components"
import { FC, useState, useMemo } from "react"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts"
import { ChevronDown } from "lucide-react"

const SChartContainer = styled.div`
  width: 100%;
`

const SChartHeader = styled.div`
  margin-bottom: 8px;
`

const SControlsFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  flex-wrap: wrap;
  gap: 16px;
`




// Figma-based filter button: pill shape, subtle background
const SFilterBtn = styled.button(
    ({ theme }) => css`
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 8px 14px;
        background: rgba(182, 182, 183, 0.2);
        border: 0.7px solid rgba(124, 127, 138, 0.2);
        border-radius: 32px;
        color: ${theme.text.medium};
        font-size: 14px;
        font-weight: 400;
        cursor: pointer;
        transition: background 0.15s ease;

        &:hover {
            background: rgba(182, 182, 183, 0.3);
        }
    `
)

// Figma-based filter item row
const SFilterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 8px;
  min-width: 100px;
  border-radius: 32px;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
      background: rgba(255, 255, 255, 0.05);
  }
`


// Fee types in Liquidity Fees
const FEE_TYPES = {
    omnipoolWithdraw: { label: 'Omnipool Withdraw Fee', color: '#22C55E' },
    isolatedPoolTrade: { label: 'Isolated Pool Trade Fee', color: '#8B5CF6' },
} as const

type FeeType = keyof typeof FEE_TYPES

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

export const LiquidityFeesChart: FC = () => {
    const [timeRange, setTimeRange] = useState<TimeRange>('1M')
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
                <div>
                    <Text fs={24} fw={700} color="#22C55E" style={{ fontFamily: 'Gazpacho, sans-serif' }}>
                        ${(total / 1000).toFixed(2)}K
                    </Text>
                    <Text fs={12} color="rgba(255,255,255,0.4)">
                        Latest period total
                    </Text>
                </div>
            </SChartHeader>


            <ResponsiveContainer width="100%" height={280}>
                <LineChart data={feesData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                        dataKey="date"
                        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                        axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                        axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                        tickLine={false}
                        tickFormatter={(value) => `$${(value / 1000).toFixed(1)}K`}
                    />
                    <Tooltip
                        contentStyle={{
                            background: 'rgba(20, 20, 30, 0.95)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 8,
                            color: '#fff',
                        }}
                        formatter={(value: number, name: string) => [
                            `$${value.toFixed(2)}`,
                            FEE_TYPES[name as FeeType]?.label || name
                        ]}
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
                                            {FEE_TYPES[entry.value as FeeType]?.label || entry.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    />
                    {(Object.entries(FEE_TYPES) as [FeeType, typeof FEE_TYPES[FeeType]][]).map(([key, { color }]) => (
                        activeTypes.includes(key) && (
                            <Line
                                key={key}
                                type="monotone"
                                dataKey={key}
                                stroke={color}
                                strokeWidth={2}
                                dot={false}
                                name={key}
                            />
                        )
                    ))}
                </LineChart>
            </ResponsiveContainer>

            <SControlsFooter>
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
            </SControlsFooter>
        </SChartContainer>
    )
}
