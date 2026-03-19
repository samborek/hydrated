import { ComputedReserveData } from "@galacticcouncil/money-market/hooks";
import { HOLLAR_ASSET_ID } from "@galacticcouncil/utils";
import { FC, useState, useEffect } from "react";

import { TAssetData } from "@/api/assets";
import { AssetSelect } from "@/components/AssetSelect/AssetSelect";
import { useAssets } from "@/providers/assetsProvider";
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
  const { all } = useAssets();
  const [selectedAsset, setSelectedAsset] = useState<TAssetData | null>(null);

  useEffect(() => {
    if (!selectedAsset && all.size > 0) {
      // Find asset among context assets that matches collateralAsset
      const initial = Array.from(all.values()).find(
        (a) => a.symbol === asset?.symbol || a.id === getReserveAssetId(asset)
      );
      if (initial) setSelectedAsset(initial);
    }
  }, [selectedAsset, all, asset]);

  // Support EURC and Hollar internally
  const eurcAsset = Array.from(all.values()).find((a) => a.symbol === "EURC");
  const hollarAsset = Array.from(all.values()).find(
    (a) => a.id === HOLLAR_ASSET_ID || a.symbol === "HOLLAR" || a.symbol === "CASH"
  );
  const selectableAssets = [eurcAsset, hollarAsset].filter(Boolean) as TAssetData[];
  // Ensure we always pass valid numeric strings to prevent big.js errors
  const safeBalance = isNaN(Number(balance)) ? "0" : balance;
  const safeMaxBalance = isNaN(Number(maxBalance)) ? "0" : maxBalance;

  // Format for display (4 decimals)
  const formattedBalance = Number(safeBalance || 0).toFixed(4);
  const formattedMax = Number(safeMaxBalance || 0).toFixed(4);

  return (
    <AssetSelect
      label="Your deposit"
      value={value}
      onChange={onChange}
      assets={selectableAssets}
      selectedAsset={
        selectedAsset
          ? {
              id: selectedAsset.id,
              decimals: selectedAsset.decimals,
              symbol: selectedAsset.symbol === "CASH" ? "HUSD" : selectedAsset.symbol,
              iconId: selectedAsset.id,
            }
          : undefined
      }
      setSelectedAsset={setSelectedAsset}
      maxBalance={formattedBalance}
      maxBalanceFallback={formattedMax}
    />
  );
};
