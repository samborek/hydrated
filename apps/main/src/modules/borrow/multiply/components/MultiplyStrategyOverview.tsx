import { Box, Flex, Grid, Text, Paper, Stack } from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { FC } from "react"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

export type MultiplyStrategyOverviewProps = {
    strategyId: string
    collateralAsset: any
    debtAsset: any
}

// MockData...
const generateChartData = () => {
    return Array.from({ length: 30 }, (_, i) => ({
        day: i,
        value: 100 + Math.random() * 20 + i * 2
    }))
}

export const MultiplyStrategyOverview: FC<MultiplyStrategyOverviewProps> = ({ collateralAsset, debtAsset }) => {
    const { themeProps: theme } = useTheme()
    const data = generateChartData()

    return (
        <Stack gap={24}>
            {/* Header / Strategy Info */}
            <Flex justify="space-between" align="center">
                <Box>
                    <Text fs={24} fw={600} font="primary" mb={4}>
                        {collateralAsset?.symbol} / {debtAsset?.symbol} Loop
                    </Text>
                    <Text fs={14} color={theme.text.medium}>
                        Supply {collateralAsset?.symbol} and borrow {debtAsset?.symbol} to amplify yield.
                    </Text>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                    <Text fs={12} color={theme.text.low} mb={2}>Total Value Locked</Text>
                    <Text fs={18} fw={600}>$2.4M</Text>
                </Box>
            </Flex>

            {/* Chart Area */}
            <Paper p={24} sx={{ background: theme.surfaces.containers.high.primary }}>
                <Flex justify="space-between" mb={20}>
                    <Text fs={16} fw={600}>Strategy Performance</Text>
                    <Flex gap={8}>
                        <Text fs={24} fw={700} color={theme.details.values.positive} style={{ fontFamily: 'Gazpacho' }}>
                            +24.5%
                        </Text>
                        <Text fs={13} color={theme.text.medium} style={{ alignSelf: 'flex-end', paddingBottom: 6 }}>
                            Past 30d
                        </Text>
                    </Flex>
                </Flex>

                <div style={{ height: 300, width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={theme.colors.azureBlue[500]} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={theme.colors.azureBlue[500]} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="day"
                                hide
                            />
                            <YAxis
                                hide
                                domain={['auto', 'auto']}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: theme.surfaces.containers.high.hover,
                                    borderColor: theme.details.borders,
                                    borderRadius: 8
                                }}
                                itemStyle={{ color: theme.text.high }}
                                labelStyle={{ display: 'none' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke={theme.colors.azureBlue[500]}
                                fillOpacity={1}
                                fill="url(#colorValue)"
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Paper>

            {/* Strategy Mechanics / Instructions (Placeholder) */}
            <Grid columns={2} gap={20}>
                <Paper p={20}>
                    <Text fs={16} fw={600} mb={12}>Risk Level: Medium</Text>
                    <Text fs={13} color={theme.text.medium} lh={1.5}>
                        This strategy involves leverage. While it amplifies APY, it also increases liquidation risk if the collateral value drops significantly relative to the debt.
                    </Text>
                </Paper>
                <Paper p={20}>
                    <Text fs={16} fw={600} mb={12}>Rewards</Text>
                    <Text fs={13} color={theme.text.medium} lh={1.5}>
                        Earn supply APY on the amplified collateral + additional incentives if applicable.
                    </Text>
                </Paper>
            </Grid>
        </Stack>
    )
}
