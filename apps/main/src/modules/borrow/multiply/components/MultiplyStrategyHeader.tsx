import { ComputedReserveData } from "@galacticcouncil/money-market/hooks";
import { Box, Flex, Text, ValueStats } from "@galacticcouncil/ui/components";
import { AssetLogo as BaseAssetLogo } from "@galacticcouncil/ui/components";
import { getToken, getTokenPx } from "@galacticcouncil/ui/utils";
import { HOLLAR_ASSET_ID } from "@galacticcouncil/utils";
import { FC } from "react";

import primeLogo from "@/assets/tokens/prime.png";
import { AssetLogo } from "@/components/AssetLogo";
import { getReserveAssetId } from "@/modules/borrow/utils/assets";

export type MultiplyStrategyHeaderProps = {
  collateralAsset: ComputedReserveData;
  debtAsset: ComputedReserveData;
};

export const MultiplyStrategyHeader: FC<MultiplyStrategyHeaderProps> = ({
  collateralAsset,
  debtAsset,
}) => {
  return (
    <Flex
      id="multiply-strategy-header"
      justify="space-between"
      align="flex-start"
      wrap
      sx={{
        pt: getTokenPx(["scales.paddings.base", "containers.paddings.primary"]),
        pb: getTokenPx("scales.paddings.xl"),
        minWidth: 0,
        gap: getTokenPx("scales.paddings.m"),
      }}
    >
      <Flex
        gap={getTokenPx("scales.paddings.m")}
        align="center"
        wrap
        sx={{ minWidth: 0, flex: "1 1 auto" }}
      >
        {collateralAsset.symbol === "PRIME" ? (
          <Flex style={{ position: "relative" }}>
            <BaseAssetLogo src={primeLogo} size="large" alt="PRIME" />
            <div
              style={{
                marginLeft: `-${getTokenPx("scales.paddings.m")}px`,
              }}
            >
              {debtAsset.symbol === "HUSD" ? (
                <AssetLogo id={HOLLAR_ASSET_ID} size="large" />
              ) : (
                <AssetLogo id={getReserveAssetId(debtAsset)} size="large" />
              )}
            </div>
          </Flex>
        ) : (
          <AssetLogo
            id={[
              getReserveAssetId(collateralAsset),
              debtAsset.symbol === "HUSD"
                ? HOLLAR_ASSET_ID
                : getReserveAssetId(debtAsset),
            ]}
            size="large"
          />
        )}

        <Flex direction="column">
          <Text font="primary" fw={700} fs="h5" lh="130%">
            {collateralAsset.symbol} Loop
          </Text>

          <Text fs="p3" color={getToken("text.medium")}>
            Supply {collateralAsset.symbol} and borrow {debtAsset.symbol} to
            amplify yield.
          </Text>
        </Flex>
      </Flex>

      <Box sx={{ minWidth: 0, flexShrink: 0 }}>
        <ValueStats
          label="Total Value Locked"
          value="$2.4M"
          size="large"
          wrap
          style={{ alignItems: "flex-end" }}
        />
      </Box>
    </Flex>
  );
};
