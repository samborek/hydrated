import { ComputedReserveData } from "@galacticcouncil/money-market/hooks"
import { AssetInput } from "@galacticcouncil/ui/components"
import { FC } from "react"
import { AssetLogo } from "@/components/AssetLogo"
import { getReserveAssetId } from "../../../utils/assets"

export type MultiplySidePanelAssetInputProps = {
    value: string
    onChange: (val: string) => void
    asset: ComputedReserveData
}

export const MultiplySidePanelAssetInput: FC<MultiplySidePanelAssetInputProps> = ({
    value,
    onChange,
    asset,
}) => {
    return (
        <AssetInput
            label="You deposit"
            symbol={asset?.symbol}
            value={value}
            onChange={onChange}
            selectedAssetIcon={
                asset ? <AssetLogo id={getReserveAssetId(asset)} /> : null
            }
            maxBalance="0"
            maxButtonBalance="0"
        />
    )
}
