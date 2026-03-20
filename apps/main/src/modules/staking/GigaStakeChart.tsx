import { Box, Flex, Paper, Text, Checkbox } from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { getToken } from "@galacticcouncil/ui/utils"
import { FC, useState } from "react"
import {
    Area,
    AreaChart as AreaChartPrimitive,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
    Line,
    ComposedChart
} from "recharts"
import { ChartContainer } from "@galacticcouncil/ui/components"

import { ChartConfig, TChartData } from "@/components/Chart/types"

// Mock data to emulate chart structure
const mockData = Array.from({ length: 100 }).map((_, i) => {
    const priceBase = 1.48
    const trend = i * 0.0015
    const noise = (Math.sin(i / 5) * 0.01) + (Math.random() * 0.005)
    const price = priceBase + trend + noise

    const apyBase = 0.18
    const apyNoise = (Math.cos(i / 10) * 0.02) + (Math.random() * 0.01)
    const apy = apyBase + apyNoise

    return {
        time: i,
        date: new Date(Date.now() - (100 - i) * 24 * 60 * 60 * 1000).getTime(),
        price,
        apy: apy * 100 // Display as percentage
    }
})

export const GigaStakeChart: FC = () => {
    const { themeProps } = useTheme()
    const [showSwap, setShowSwap] = useState(false)

    const config: ChartConfig<TChartData> = {
        xAxisKey: "date",
        series: [
            { key: "price", color: themeProps.details.values.positive },
            { key: "apy", color: themeProps.text.medium }
        ]
    }

    return (
        <Paper px="m" py="m">
            <Flex direction="column" gap="xl">
                <Box>
                    <Text fs="h6" color={getToken("text.high")}>GIGAHDX Performance</Text>
                </Box>
                <Box sx={{ height: 250, width: "100%" }}>
                    <ChartContainer config={config} height={250}>
                        <ComposedChart data={mockData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={themeProps.details.values.positive} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={themeProps.details.values.positive} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={themeProps.text.low} opacity={0.15} />
                            <XAxis
                                dataKey="date"
                                hide
                                domain={["dataMin", "dataMax"]}
                                type="number"
                            />
                            <YAxis
                                yAxisId="price"
                                domain={["auto", "auto"]}
                                orientation="right"
                                axisLine={false}
                                tickLine={false}
                                style={{ fontSize: 12, fill: getToken("text.medium") }}
                                tickFormatter={(val) => val.toFixed(4)}
                            />
                            <YAxis
                                yAxisId="apy"
                                domain={[0, "auto"]}
                                orientation="left"
                                hide
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: themeProps.details.tooltips, borderRadius: 8, border: "none" }}
                                itemStyle={{ color: getToken("text.high") }}
                                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                                formatter={(value: number, name: string) => {
                                    if (name === "price") return [value.toFixed(4), "Price"]
                                    if (name === "apy") return [`${value.toFixed(2)}%`, "APY"]
                                    return [value, name]
                                }}
                            />
                            <Area
                                yAxisId="price"
                                type="monotone"
                                dataKey="price"
                                stroke={themeProps.details.values.positive}
                                fill="url(#priceGradient)"
                                strokeWidth={2}
                                activeDot={{ r: 4 }}
                                animationDuration={1000}
                            />
                            {showSwap && (
                                <Line
                                    yAxisId="apy"
                                    type="monotone"
                                    dataKey="apy"
                                    stroke={themeProps.text.medium}
                                    strokeWidth={1.5}
                                    dot={false}
                                    animationDuration={1000}
                                />
                            )}
                        </ComposedChart>
                    </ChartContainer>
                </Box>
                <Flex justify="center" align="center" mt="m">
                    <Paper px="m" py="s" sx={{ display: "inline-flex", borderRadius: "full" }}>
                        <Flex gap="s" align="center">
                            <Checkbox checked={showSwap} onCheckedChange={(c) => setShowSwap(!!c)} />
                            <Text fs="p5" color={getToken("text.high")} sx={{ userSelect: "none", cursor: "pointer" }} onClick={() => setShowSwap(!showSwap)}>Show APY</Text>
                        </Flex>
                    </Paper>
                </Flex>
            </Flex>
        </Paper>
    )
}
