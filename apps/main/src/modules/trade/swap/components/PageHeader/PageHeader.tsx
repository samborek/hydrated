import { Flex } from "@galacticcouncil/ui/components"
import { useSearch } from "@tanstack/react-router"
import { ReactNode } from "react"

import { AssetHeader } from "@/components/AssetHeader"
import { useAssets } from "@/providers/assetsProvider"

type Props = {
  readonly actions?: ReactNode
}

export const PageHeader = ({ actions }: Props) => {
  const { getAsset } = useAssets()
  const { assetOut } = useSearch({ from: "/trade/_history" })

  const asset = getAsset(assetOut)

  if (!asset) return null

  return (
    <Flex align="center" justify="space-between">
      <AssetHeader asset={asset} />
      {actions}
    </Flex>
  )
}
