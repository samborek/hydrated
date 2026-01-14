import styled from "@emotion/styled"
import { Text } from "@galacticcouncil/ui/components"
import { AssetLogo } from "@/components/AssetLogo"

const SHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`

const SAssetInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const STvlContainer = styled.div`
  text-align: right;
`

type Props = {
    name: string
    symbol: string
    tvl: string
    assetId: string
}

export const AssetHeader = ({ name, assetId, tvl }: Props) => {
    return (
        <SHeader>
            <SAssetInfo>
                <AssetLogo id={assetId} size="large" />
                <Text fs={28} fw={700} color="text.high" sx={{ fontFamily: 'Gazpacho, sans-serif' }}>
                    {name}
                </Text>
            </SAssetInfo>
            <STvlContainer>
                <Text fs={13} color="text.medium" transform="uppercase">
                    Total value locked
                </Text>
                <Text fs={32} fw={700} color="text.high" sx={{ fontFamily: 'Gazpacho, sans-serif' }}>
                    {tvl}
                </Text>
            </STvlContainer>
        </SHeader>
    )
}
