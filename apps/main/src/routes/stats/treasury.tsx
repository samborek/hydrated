import { createFileRoute } from "@tanstack/react-router"
import { css, styled } from "@galacticcouncil/ui/utils"
import { SectionHeader, ValueStats, ValueStatsValue } from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { TreasuryChart } from "@/modules/stats/components/TreasuryChart"
import { OmnipoolTable } from "@/modules/stats/components/OmnipoolTable"

const SPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 0 24px 0;
`

const SSection = styled.section(
    ({ theme }) => css`
    background: ${theme.surfaces.containers.high.primary};
    border: 1px solid ${theme.details.borders};
    border-radius: 16px;
    padding: ${theme.containers.paddings.secondary}px;
  `
)

const SMetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`

const SStatCard = styled.div(
    ({ theme }) => css`
    background: ${theme.surfaces.containers.high.primary};
    border: 1px solid ${theme.details.borders};
    border-radius: 12px;
    padding: 20px;
  `
)

function TreasuryStats() {
    const { themeProps: theme } = useTheme()

    return (
        <SPageContainer>
            <SectionHeader as="h1" sx={{ p: 0 }} mb={-12}>Treasury</SectionHeader>

            <SMetricsGrid>
                <SStatCard>
                    <ValueStats
                        label="Total Treasury Value"
                        size="medium"
                        customValue={
                            <ValueStatsValue size="medium" style={{ color: theme.details.values.positive }}>
                                $2,852,500
                            </ValueStatsValue>
                        }
                    />
                </SStatCard>
                <SStatCard>
                    <ValueStats
                        label="LP Positions Value"
                        value="$1,200,000"
                        size="medium"
                    />
                </SStatCard>
                <SStatCard>
                    <ValueStats
                        label="Staked Assets Value"
                        value="$225,000"
                        size="medium"
                    />
                </SStatCard>
            </SMetricsGrid>

            <SSection>
                <TreasuryChart title="Treasury Value History" value="$2.85M" />
            </SSection>

            <SSection>
                <SectionHeader>Omnipool assets</SectionHeader>
                <OmnipoolTable />
            </SSection>
        </SPageContainer>
    )
}

export const Route = createFileRoute("/stats/treasury")({
    component: TreasuryStats,
})
