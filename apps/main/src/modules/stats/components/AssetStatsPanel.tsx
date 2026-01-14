import styled from "@emotion/styled"
import { css } from "@galacticcouncil/ui/utils"
import { Flex, Text } from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { AssetLogo } from "@/components/AssetLogo"
import { FC } from "react"

const SPanel = styled.div(
    ({ theme }) => css`
    background: ${theme.surfaces.containers.high.primary};
    border: 1px solid ${theme.details.borders};
    border-radius: 16px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 0;
  `
)

const SStatItem = styled.div(
    ({ theme }) => css`
    padding: 16px 0;
    border-bottom: 1px solid ${theme.details.separators};
    
    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    
    &:first-of-type {
      padding-top: 0;
    }
  `
)

const SStatLabel = styled(Text)`
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin-bottom: 8px;
  display: block;
`

type Props = {
    price: string
    assetId: string
    volume24h: string
    pol: string
    apr: string
    omnipoolShare: string
}

export const AssetStatsPanel: FC<Props> = ({
    price,
    assetId,
    volume24h,
    pol,
    apr,
    omnipoolShare,
}) => {
    const { themeProps: theme } = useTheme()

    return (
        <SPanel>
            {/* Price */}
            <SStatItem>
                <SStatLabel fs={11} fw={500} color="text.medium">
                    Price
                </SStatLabel>
                <Flex gap={8} align="center">
                    <AssetLogo id={assetId} size="small" />
                    <Text fs={28} fw={700} color="text.high" sx={{ fontFamily: 'Gazpacho, sans-serif' }}>
                        {price}
                    </Text>
                </Flex>
            </SStatItem>

            {/* 24h Volume */}
            <SStatItem>
                <SStatLabel fs={11} fw={500} color="text.medium">
                    24h Volume
                </SStatLabel>
                <Text fs={28} fw={700} color="text.high" sx={{ fontFamily: 'Gazpacho, sans-serif' }}>
                    {volume24h}
                </Text>
            </SStatItem>

            {/* Hydration POL */}
            <SStatItem>
                <SStatLabel fs={11} fw={500} color="text.medium">
                    Hydration POL
                </SStatLabel>
                <Text fs={28} fw={700} color="text.high" sx={{ fontFamily: 'Gazpacho, sans-serif' }}>
                    {pol}
                </Text>
            </SStatItem>

            {/* Fee + Farm APR */}
            <SStatItem>
                <SStatLabel fs={11} fw={500} color="text.medium">
                    Fee + Farm APR
                </SStatLabel>
                <Text fs={28} fw={700} color={theme.details.values.positive} sx={{ fontFamily: 'Gazpacho, sans-serif' }}>
                    {apr}
                </Text>
            </SStatItem>

            {/* % of Omnipool */}
            <SStatItem>
                <SStatLabel fs={11} fw={500} color="text.medium">
                    % of Omnipool
                </SStatLabel>
                <Text fs={28} fw={700} color="text.high" sx={{ fontFamily: 'Gazpacho, sans-serif' }}>
                    {omnipoolShare}
                </Text>
            </SStatItem>
        </SPanel>
    )
}
