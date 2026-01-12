import styled from "@emotion/styled"
import { Text } from "@galacticcouncil/ui/components"
import { FC, useState } from "react"
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

const SChartContainer = styled.div`
  width: 100%;
`

const SChartHeader = styled.div`
  margin-bottom: 8px;
`


const SToggleGroup = styled.div`
display: flex;
background: rgba(255, 255, 255, 0.05);
border - radius: 8px;
padding: 4px;
`

const SToggleButton = styled.button<{ $active?: boolean }>`
padding: 6px 12px;
border: none;
border - radius: 6px;
cursor: pointer;
font - size: 12px;
font - weight: 500;
transition: all 0.2s;
background: ${({ $active }) => $active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
color: ${({ $active }) => $active ? '#fff' : 'rgba(255, 255, 255, 0.5)'};
  
  &:hover {
    color: #fff;
}
`

const STimeRangeGroup = styled.div`
display: flex;
gap: 8px;
`

const STimeButton = styled.button<{ $active?: boolean }>`
padding: 6px 12px;
border: 1px solid ${({ $active }) => $active ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
border - radius: 6px;
cursor: pointer;
font - size: 12px;
font - weight: 500;
background: ${({ $active }) => $active ? 'rgba(255, 255, 255, 0.05)' : 'transparent'};
color: ${({ $active }) => $active ? '#fff' : 'rgba(255, 255, 255, 0.5)'};
  
  &:hover {
    color: #fff;
}
`

const SChartValue = styled.div`
  margin-bottom: 0;
`

const SControlsFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  flex-wrap: wrap;
  gap: 16px;
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

const priceData = generatePriceData()

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

    const latestPrice = priceData[priceData.length - 1]?.price || 0

    return (
        <SChartContainer>
            <SChartHeader>
                {title && <Text fs={14} fw={500} color="rgba(255,255,255,0.6)" className="mb-1">{title}</Text>}
                <SChartValue>
                    {/* <Text fs={12} color="rgba(255,255,255,0.5)">
                        {chartType === 'price' ? 'Price' : 'Volume'}
                    </Text> */}
                    {/* The label seemed redundant if Title is present, or I can align with Figma */}
                    {/* Figma screenshot shows Price top left. */}
                    <Text fs={12} color="rgba(255,255,255,0.5)">
                        {chartType === 'price' ? 'Price' : 'Volume'}
                    </Text>
                    <Text fs={24} fw={600}>
                        {chartType === 'price'
                            ? `${latestPrice.toFixed(9)} HDX`
                            : `$${((priceData[priceData.length - 1]?.volume ?? 0) / 1000).toFixed(0)} K`
                        }
                    </Text>
                </SChartValue>
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
                            tickFormatter={(value) => `$${value.toFixed(3)} `}
                            domain={['auto', 'auto']}
                        />
                        <Tooltip
                            contentStyle={{
                                background: 'rgba(20, 20, 30, 0.95)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 8,
                                color: '#fff',
                            }}
                            formatter={(value: number) => [`$${value.toFixed(6)} `, 'Price']}
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
                            tickFormatter={(value) => `$${(value / 1000).toFixed(0)} K`}
                        />
                        <Tooltip
                            contentStyle={{
                                background: 'rgba(20, 20, 30, 0.95)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 8,
                                color: '#fff',
                            }}
                            formatter={(value: number) => [`$${value.toLocaleString()} `, 'Volume']}
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
                    {(['ALL', '1D', '1W', '1M'] as TimeRange[]).map((range) => (
                        <STimeButton
                            key={range}
                            $active={timeRange === range}
                            onClick={() => setTimeRange(range)}
                        >
                            {range}
                        </STimeButton>
                    ))}
                </STimeRangeGroup>
            </SControlsFooter>
        </SChartContainer>
    )
}
