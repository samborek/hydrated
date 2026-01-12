import { Input, Text, Flex, Box, AssetLabel } from "@galacticcouncil/ui/components"
import { getToken } from "@galacticcouncil/ui/utils"
import styled from "@emotion/styled"
import { Search } from "lucide-react"
import { useState, FC } from "react"
import { useAssets } from "@/providers/assetsProvider"
import { AssetLogo } from "@/components/AssetLogo"

const Container = styled(Flex)`
  height: 480px;
  overflow: hidden;
`

const LeftColumn = styled(Flex)`
  width: 200px;
  flex-shrink: 0;
  flex-direction: column;
  padding: 12px;
  gap: 16px;
  border-right: 1px solid;
`

const RightColumn = styled(Flex)`
  flex: 1;
  flex-direction: column;
  padding: 12px;
  gap: 16px;
`

const ScrollArea = styled(Box)`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding-right: 12px;
  margin-right: -12px;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
`

const EXCHANGES = [
    { id: "kraken", name: "Kraken" },
    { id: "binance", name: "Binance" },
    { id: "bybit", name: "Bybit" },
    { id: "mexc", name: "Mexc" },
    { id: "other", name: "Other" },
]

type Props = {
    onSelect: (exchange: { id: string, name: string }, asset: any) => void
}

export const CexDeposit: FC<Props> = ({ onSelect }) => {
    const { tradable } = useAssets()
    const [exchangeSearch, setExchangeSearch] = useState("")
    const [assetSearch, setAssetSearch] = useState("")
    const [selectedExchangeId, setSelectedExchangeId] = useState<string | null>(null)

    const filteredExchanges = EXCHANGES.filter(ex =>
        ex.name.toLowerCase().includes(exchangeSearch.toLowerCase())
    )

    const filteredAssets = tradable.filter(asset =>
        asset.symbol.toLowerCase().includes(assetSearch.toLowerCase()) ||
        asset.name.toLowerCase().includes(assetSearch.toLowerCase())
    ).sort((a, b) => {
        const priority = ["DOT", "USDC", "USDT", "BTC", "ETH", "HDX"]
        const indexA = priority.indexOf(a.symbol)
        const indexB = priority.indexOf(b.symbol)
        if (indexA !== -1 && indexB !== -1) return indexA - indexB
        if (indexA !== -1) return -1
        if (indexB !== -1) return 1
        return 0
    })

    const handleAssetClick = (asset: any) => {
        if (!selectedExchangeId) return
        const exchange = EXCHANGES.find(e => e.id === selectedExchangeId)
        if (exchange) {
            onSelect(exchange, asset)
        }
    }

    return (
        <Container>
            <LeftColumn sx={{ borderColor: getToken("details.separators") }}>
                <Input
                    placeholder="Chain"
                    value={exchangeSearch}
                    onChange={(e) => setExchangeSearch(e.target.value)}
                    iconStart={Search}
                />
                <Text color="neutral.gray.300" fw={500} fs={12} style={{ marginTop: 4 }}>Exchanges:</Text>
                <ScrollArea>
                    {filteredExchanges.map(ex => {
                        const active = selectedExchangeId === ex.id
                        return (
                            <Flex
                                as="button"
                                key={ex.id}
                                align="center"
                                gap={8}
                                px={10}
                                sx={{
                                    minHeight: 50,
                                    flexShrink: 0,
                                    cursor: "pointer",
                                    textAlign: "left",
                                    background: active ? getToken("accents.info.accent") : "transparent",
                                    border: "none",
                                    borderBottom: "1px solid",
                                    borderBottomColor: getToken("details.separators"),
                                    transition: "all 0.2s",
                                    "&:hover": {
                                        background: getToken("details.separators"),
                                    },
                                    "&:last-child": {
                                        borderBottom: "none"
                                    }
                                }}
                                onClick={() => setSelectedExchangeId(ex.id)}
                            >
                                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                                <Text fw={600} fs={14}>{ex.name}</Text>
                            </Flex>
                        )
                    })}
                </ScrollArea>
            </LeftColumn>

            <RightColumn>
                <Input
                    placeholder="Search tokens"
                    value={assetSearch}
                    onChange={(e) => setAssetSearch(e.target.value)}
                    iconStart={Search}
                />
                <Text color="neutral.gray.300" fw={500} fs={12} style={{ marginTop: 4 }}>Assets:</Text>
                <ScrollArea>
                    {filteredAssets.map(asset => (
                        <Flex
                            as="button"
                            key={asset.id}
                            align="center"
                            gap={8}
                            px={10}
                            sx={{
                                minHeight: 50,
                                flexShrink: 0,
                                cursor: "pointer",
                                textAlign: "left",
                                background: "transparent",
                                border: "none",
                                borderBottom: "1px solid",
                                borderBottomColor: getToken("details.separators"),
                                transition: "all 0.2s",
                                opacity: selectedExchangeId ? 1 : 0.5,
                                pointerEvents: selectedExchangeId ? 'auto' : 'none',
                                "&:hover": {
                                    background: getToken("details.separators"),
                                },
                                "&:last-child": {
                                    borderBottom: "none"
                                }
                            }}
                            onClick={() => handleAssetClick(asset)}
                        >
                            <AssetLogo id={asset.id} size="medium" />
                            <AssetLabel symbol={asset.symbol} name={asset.name} />
                        </Flex>
                    ))}
                </ScrollArea>
            </RightColumn>
        </Container>
    )
}
