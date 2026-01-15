import { Box, Grid, Paper, Stack, Text } from "@galacticcouncil/ui/components"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "@tanstack/react-router"
import { Icon } from "@galacticcouncil/ui/components"
import { ArrowLeft } from "lucide-react"

export type MultiplyDetailPageProps = {
    strategyId: string
}

export const MultiplyDetailPage: FC<MultiplyDetailPageProps> = ({ strategyId }) => {
    // const { t } = useTranslation(["borrow"])

    return (
        <Stack gap={30}>
            <Link to="/borrow/multiply" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, color: 'white' }}>
                <Icon component={ArrowLeft} size={20} />
                <Text>Back to Multiply</Text>
            </Link>

            <Box>
                <Text fs="h7" fw={600} font="primary" sx={{ mb: 10 }}>
                    Multiply Strategy: {strategyId}
                </Text>

                <Grid
                    columnTemplate={["1fr", null, null, "1fr 380px"]}
                    gap={20}
                    alignItems="start"
                >
                    {/* Left Panel - Overview */}
                    <Paper p={20}>
                        <Text>Strategy Overview (Chart & Details)</Text>
                        <div style={{ height: 300, background: 'rgba(255,255,255,0.05)', marginTop: 20, borderRadius: 8 }}></div>
                    </Paper>

                    {/* Right Panel - Actions */}
                    <Paper p={20}>
                        <Text fs={18} fw={600} mb={20}>Multiply Actions</Text>
                        <Text>Leverage Slider Placeholder</Text>
                        {/* Slider Component Here */}
                        <div style={{ padding: '40px 0' }}>
                            <input type="range" min="1" max="5" step="0.1" style={{ width: '100%' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>1x</span>
                                <span>5x</span>
                            </div>
                        </div>

                        <Text fs={14} color="gray" mb={10}>Collateral Amount</Text>
                        <div style={{ height: 50, background: 'rgba(255,255,255,0.1)', borderRadius: 4, marginBottom: 20 }}></div>

                        <Text fs={14} color="gray" mb={10}>Buying Power</Text>
                        <div style={{ height: 50, background: 'rgba(255,255,255,0.1)', borderRadius: 4 }}></div>
                    </Paper>
                </Grid>
            </Box>
        </Stack>
    )
}
