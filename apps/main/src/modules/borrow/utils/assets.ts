import { ComputedReserveData } from "@galacticcouncil/money-market/hooks"
import { GHO_ASSET_ID, isGho } from "@galacticcouncil/money-market/utils"
import {
    GDOT_ASSET_ID,
    GDOT_ERC20_ID,
    getAssetIdFromAddress,
    GETH_ASSET_ID,
    GETH_ERC20_ID,
} from "@galacticcouncil/utils"

const RESERVE_LOGO_OVERRIDE_MAP: Record<string, string> = {
    [GDOT_ASSET_ID]: GDOT_ERC20_ID,
    [GETH_ASSET_ID]: GETH_ERC20_ID,
}

export const getReserveAssetId = (reserve: ComputedReserveData): string => {
    const assetId = isGho(reserve)
        ? GHO_ASSET_ID
        : getAssetIdFromAddress(reserve.underlyingAsset)
    return RESERVE_LOGO_OVERRIDE_MAP[assetId] ?? assetId
}
