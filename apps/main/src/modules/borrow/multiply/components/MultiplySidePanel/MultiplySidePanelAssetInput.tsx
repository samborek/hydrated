import { ComputedReserveData } from "@galacticcouncil/money-market/hooks";
import {
  AssetInput,
  AssetLogo as BaseAssetLogo,
} from "@galacticcouncil/ui/components";
import { HOLLAR_ASSET_ID } from "@galacticcouncil/utils";
import { FC } from "react";

import primeLogo from "@/assets/tokens/prime.png";
import { AssetLogo } from "@/components/AssetLogo";
import { getReserveAssetId } from "@/modules/borrow/utils/assets";

export type MultiplySidePanelAssetInputProps = {
  value: string;
  onChange: (val: string) => void;
  asset: ComputedReserveData;
  balance?: string;
  maxBalance?: string;
};

export const MultiplySidePanelAssetInput: FC<
  MultiplySidePanelAssetInputProps
> = ({ value, onChange, asset, balance = "0", maxBalance = "0" }) => {
  // Ensure we always pass valid numeric strings to prevent big.js errors
  const safeBalance = isNaN(Number(balance)) ? "0" : balance;
  const safeMaxBalance = isNaN(Number(maxBalance)) ? "0" : maxBalance;

  // Format for display (4 decimals)
  const formattedBalance = Number(safeBalance || 0).toFixed(4);
  const formattedMax = Number(safeMaxBalance || 0).toFixed(4);

  return (
    <AssetInput
      label="You deposit"
      symbol={asset?.symbol}
      value={value}
      onChange={onChange}
      selectedAssetIcon={
        asset?.symbol === "PRIME" ? (
          <BaseAssetLogo src={primeLogo} size="medium" alt="PRIME" />
        ) : asset?.symbol === "HUSD" ? (
          <AssetLogo id={HOLLAR_ASSET_ID} size="medium" />
        ) : asset ? (
          <AssetLogo id={getReserveAssetId(asset)} size="medium" />
        ) : null
      }
      maxBalance={formattedBalance}
      maxButtonBalance={formattedMax}
    />
  );
};
