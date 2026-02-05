import { ComputedReserveData } from "@galacticcouncil/money-market/hooks"
import { AssetInput } from "@galacticcouncil/ui/components"
import { FC } from "react"

import { AssetLogo } from "@/components/AssetLogo"
import { getReserveAssetId } from "@/modules/borrow/utils/assets"

export type MultiplySidePanelAssetInputProps = {
    value: string
    onChange: (val: string) => void
    asset: ComputedReserveData
    balance?: string
    maxBalance?: string
}

export const MultiplySidePanelAssetInput: FC<
    MultiplySidePanelAssetInputProps
> = ({ value, onChange, asset, balance = "0", maxBalance = "0" }) => {
    const formattedBalance = Number(balance || 0).toFixed(4)
    const formattedMax = Number(maxBalance || 0).toFixed(4)

    return (
        <AssetInput
            label="You deposit"
            symbol={asset?.symbol}
            value={value}
            onChange={onChange}
            selectedAssetIcon={
                asset ? <AssetLogo id={getReserveAssetId(asset)} /> : null
            }
            maxBalance={formattedBalance}
            maxButtonBalance={formattedMax}
        />
    )
}
