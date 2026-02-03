import styled from "@emotion/styled"
import {
    Box,
    Flex,
    Grid,
    Paper,
    Stack,
    Text,
} from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { css, getTokenPx } from "@galacticcouncil/ui/utils"
import { FC, useMemo } from "react"
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import { ChevronDown } from "lucide-react"

const SChartWrapper = styled.div`
  width: 100%;
  height: 320px;
`

const SInputTile = styled(Flex)(
    ({ theme }) => css`
    background: ${theme.surfaces.containers.high.primary};
    border: 1px solid ${theme.details.borders};
    border-radius: ${theme.scales.cornerRadius.base}px;
    padding: 12px 16px;
    cursor: pointer;
    justify-content: space-between;
    align-items: center;
    flex: 1;

    &:hover {
      background: ${theme.surfaces.containers.high.hover};
    }
  `,
)

const SSummaryCard = styled(Paper)(
    ({ theme }) => css`
    background: ${theme.surfaces.containers.high.primary};
    border: 1px solid ${theme.details.borders};
    padding: ${theme.scales.paddings.l}px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
)

const STooltipContainer = styled.div(
    ({ theme }) => css`
    background: ${theme.surfaces.containers.high.primary};
    border: 1px solid ${theme.details.borders};
    border-radius: 4px;
    padding: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  `,
)

const generatePnLData = () => {
    return Array.from({ length: 30 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - (30 - i))
        return {
            date: date.toLocaleDateString("en-US", { day: "2-digit", month: "2-digit" }),
            prime: i * 0.02 + Math.random() * 0.05,
            position: i * 0.04 + Math.random() * 0.1,
        }
    })
}

export const SimulationTab: FC<{ collateralSymbol: string; debtSymbol: string }> = ({
    collateralSymbol,
    debtSymbol,
}) => {
    const { themeProps: theme } = useTheme()
    const data = useMemo(() => generatePnLData(), [])

    return (
        <Stack gap={getTokenPx("scales.paddings.xl")}>
            {/* Simulation Input */}
            <Paper p={getTokenPx("scales.paddings.xl")}>
                <Text fs="p1" fw={600} mb={getTokenPx("scales.paddings.s")}>
                    Simulation Input
                </Text>
                <Text fs="p4" color={theme.text.low} mb={getTokenPx("scales.paddings.xl")}>
                    Backtest using historical market data to simulate outcomes for a
                    leveraged position over a specific time range.
                </Text>

                <Stack gap={getTokenPx("scales.paddings.base")}>
                    <Flex gap={getTokenPx("scales.paddings.base")}>
                        <SInputTile>
                            <Stack gap={2}>
                                <Text fs="p6" color={theme.text.low}>Pair</Text>
                                <Flex align="center" gap={8}>
                                    <Text fs="p3" fw={600}>{collateralSymbol}/{debtSymbol}</Text>
                                </Flex>
                            </Stack>
                            <ChevronDown size={16} />
                        </SInputTile>
                        <SInputTile>
                            <Stack gap={2}>
                                <Text fs="p6" color={theme.text.low}>Leverage</Text>
                                <Text fs="p3" fw={600}>4.75x</Text>
                            </Stack>
                            <ChevronDown size={16} />
                        </SInputTile>
                    </Flex>
                    <Flex gap={getTokenPx("scales.paddings.base")}>
                        <SInputTile>
                            <Stack gap={2}>
                                <Text fs="p6" color={theme.text.low}>Start Date</Text>
                                <Text fs="p3" fw={600}>Jan 4, 2026</Text>
                            </Stack>
                            <ChevronDown size={16} />
                        </SInputTile>
                        <SInputTile>
                            <Stack gap={2}>
                                <Text fs="p6" color={theme.text.low}>End Date</Text>
                                <Text fs="p3" fw={600}>Feb 3, 2026</Text>
                            </Stack>
                            <ChevronDown size={16} />
                        </SInputTile>
                    </Flex>
                </Stack>
            </Paper>

            {/* Summary Stats */}
            <Grid columns={[2, 4]} gap={getTokenPx("scales.paddings.l")}>
                <SSummaryCard>
                    <Text fs="h4" fw={700} color={theme.details.values.positive} style={{ fontFamily: "Gazpacho" }}>
                        0.60%
                    </Text>
                    <Text fs="p4" color={theme.text.low}>PnL vs {collateralSymbol}</Text>
                </SSummaryCard>
                <SSummaryCard>
                    <Text fs="h4" fw={700} color={theme.details.values.positive} style={{ fontFamily: "Gazpacho" }}>
                        +1.24%
                    </Text>
                    <Text fs="p4" color={theme.text.low}>PnL vs {debtSymbol}</Text>
                </SSummaryCard>
                <SSummaryCard>
                    <Text fs="h4" fw={700} color={theme.details.values.positive} style={{ fontFamily: "Gazpacho" }}>
                        16.19%
                    </Text>
                    <Text fs="p4" color={theme.text.low}>Avg. Net APY</Text>
                </SSummaryCard>
                <SSummaryCard>
                    <Text fs="h4" fw={700} color={theme.text.high} style={{ fontFamily: "Gazpacho" }}>
                        30 Days
                    </Text>
                    <Text fs="p4" color={theme.text.low}>Duration</Text>
                </SSummaryCard>
            </Grid>

            {/* PnL Chart */}
            <Paper p={getTokenPx("scales.paddings.xl")}>
                <Flex justify="space-between" align="center" mb={getTokenPx("scales.paddings.xl")}>
                    <Text fs="p2" fw={600}>Position PnL</Text>
                    <Flex gap={12} align="center">
                        <Text fs="p5" color={theme.text.low}>7D</Text>
                        <Paper p="4px 8px" sx={{ background: theme.surfaces.containers.high.hover }}>
                            <Text fs="p5" fw={600}>30D</Text>
                        </Paper>
                        <Flex gap={4} align="center">
                            <Text fs="p5" color={theme.text.low}>3M</Text>
                            <ChevronDown size={12} color={theme.text.low} />
                        </Flex>
                    </Flex>
                </Flex>

                <SChartWrapper>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="grad-prime" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={theme.details.values.positive} stopOpacity={0.1} />
                                    <stop offset="95%" stopColor={theme.details.values.positive} stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="grad-position" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#5EA1FF" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#5EA1FF" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="0" stroke={theme.details.separators} vertical={false} />
                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: theme.text.medium, fontSize: 11 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: theme.text.medium, fontSize: 11 }} tickFormatter={(val) => `${val}%`} orientation="right" />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <STooltipContainer>
                                                <Text fs={12} fw={600} mb={4}>{payload[0].payload.date}</Text>
                                                <Stack gap={4}>
                                                    <Flex justify="space-between" gap={20}>
                                                        <Text fs={12} color={theme.details.values.positive}>{collateralSymbol}</Text>
                                                        <Text fs={12} fw={700}>{Number(payload[0].value).toFixed(2)}%</Text>
                                                    </Flex>
                                                    <Flex justify="space-between" gap={20}>
                                                        <Text fs={12} color="#5EA1FF">Your Position</Text>
                                                        <Text fs={12} fw={700}>{Number(payload[1].value).toFixed(2)}%</Text>
                                                    </Flex>
                                                </Stack>
                                            </STooltipContainer>
                                        )
                                    }
                                    return null
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="prime"
                                stroke={theme.details.values.positive}
                                fillOpacity={1}
                                fill="url(#grad-prime)"
                                strokeWidth={2}
                            />
                            <Area
                                type="monotone"
                                dataKey="position"
                                stroke="#5EA1FF"
                                fillOpacity={1}
                                fill="url(#grad-position)"
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </SChartWrapper>

                <Flex gap={20} mt={20}>
                    <Flex align="center" gap={8}>
                        <Box sx={{ width: 12, height: 2, background: theme.details.values.positive }} />
                        <Text fs="p5" fw={600}>{collateralSymbol}</Text>
                    </Flex>
                    <Flex align="center" gap={8}>
                        <Box sx={{ width: 12, height: 2, background: "#5EA1FF" }} />
                        <Text fs="p5" fw={600}>Your Position</Text>
                    </Flex>
                </Flex>
            </Paper>

            {/* Disclaimers */}
            <Paper p={getTokenPx("scales.paddings.xl")}>
                <Text fs="p2" fw={600} mb={getTokenPx("scales.paddings.s")}>
                    Disclaimers
                </Text>
                <Text fs="p4" color={theme.text.low} lh="150%">
                    Backtesting simulation results for the selected token pair are based on
                    historical data and provided for illustrative purposes only. They do
                    not guarantee future performance, and actual market outcomes may differ
                    significantly. Results may also be incomplete or inaccurate. Swapping
                    and slippage costs are not included in the analysis.
                </Text>
            </Paper>
        </Stack>
    )
}
