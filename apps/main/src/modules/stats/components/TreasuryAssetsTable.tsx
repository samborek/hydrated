import styled from "@emotion/styled"
import { Flex, Text } from "@galacticcouncil/ui/components"
import { getToken } from "@galacticcouncil/ui/utils"
import { FC, useState } from "react"

import { AssetLogo } from "@/components/AssetLogo"

const PAGE_SIZE = 10

type TreasuryAsset = {
  id: string
  name: string
  balance: string
  usdValue: string
}

// Mock data matching Figma design — replace with live data once indexer is wired
const TREASURY_ASSETS: TreasuryAsset[] = [
  { id: "0", name: "HDX", balance: "2 020 204 791", usdValue: "$6 208 203" },
  { id: "5", name: "DOT", balance: "781 107", usdValue: "$999 418" },
  { id: "1", name: "H2O", balance: "147 501", usdValue: "$1 116 451" },
  { id: "420", name: "GETH", balance: "382.6874", usdValue: "$897 231" },
  { id: "10", name: "USDT", balance: "526 302", usdValue: "$526 302" },
  { id: "15", name: "vDOT", balance: "418 715", usdValue: "$424 923" },
  { id: "22", name: "USDC", balance: "380 554", usdValue: "$380 554" },
  { id: "11", name: "WBTC", balance: "5.0023", usdValue: "$380 554" },
  { id: "100", name: "2-Pool-PRIME", balance: "1 000 000", usdValue: "$1 005 891" },
  { id: "102", name: "3-Pool-MRL", balance: "600 000", usdValue: "$601 108" },
  { id: "101", name: "2-Pool", balance: "418 715", usdValue: "$424 923" },
  { id: "16", name: "HEURC", balance: "526 302", usdValue: "$532 087" },
]

const STable = styled.div`
  width: 100%;
`

const SHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 0 0 12px;
  border-bottom: 1px solid ${({ theme }) => theme.details.borders};
`

const SRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.details.borders};

  &:last-of-type {
    border-bottom: none;
  }
`

const SPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding-top: 20px;
`

const SPageBtn = styled.button<{ $active?: boolean }>`
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  background: ${({ $active, theme }) =>
    $active ? theme.surfaces.containers.mid.primary : "transparent"};
  color: ${({ $active, theme }) =>
    $active ? theme.text.high : theme.text.low};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.surfaces.containers.mid.primary};
    color: ${({ theme }) => theme.text.high};
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`

export const TreasuryAssetsTable: FC = () => {
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(TREASURY_ASSETS.length / PAGE_SIZE)
  const start = (page - 1) * PAGE_SIZE
  const visible = TREASURY_ASSETS.slice(start, start + PAGE_SIZE)

  return (
    <STable>
      <SHeader>
        <Text
          fs={11}
          fw={500}
          color={getToken("text.low")}
          css={{ textTransform: "uppercase", letterSpacing: "0.06em" }}
        >
          Asset
        </Text>
        <Text
          fs={11}
          fw={500}
          color={getToken("text.low")}
          css={{ textTransform: "uppercase", letterSpacing: "0.06em" }}
        >
          Balance
        </Text>
      </SHeader>

      {visible.map((asset) => (
        <SRow key={asset.id}>
          <Flex gap={12} align="center">
            <AssetLogo id={asset.id} size="medium" />
            <Text fs={14} fw={500} color={getToken("text.high")}>
              {asset.name}
            </Text>
          </Flex>
          <Flex direction="column" align="flex-end" gap={2}>
            <Text fs={14} fw={500} color={getToken("text.high")}>
              {asset.balance}
            </Text>
            <Text fs={12} fw={400} color={getToken("text.medium")}>
              {asset.usdValue}
            </Text>
          </Flex>
        </SRow>
      ))}

      {totalPages > 1 && (
        <SPagination>
          <SPageBtn disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Prev
          </SPageBtn>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <SPageBtn key={p} $active={p === page} onClick={() => setPage(p)}>
              {p}
            </SPageBtn>
          ))}
          <SPageBtn
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </SPageBtn>
        </SPagination>
      )}
    </STable>
  )
}
