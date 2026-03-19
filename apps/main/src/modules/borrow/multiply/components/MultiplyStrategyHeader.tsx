import { ComputedReserveData } from "@galacticcouncil/money-market/hooks";
import { Box, Flex, Text, ValueStats } from "@galacticcouncil/ui/components";
import { AssetLogo as BaseAssetLogo } from "@galacticcouncil/ui/components";
import { getToken, getTokenPx } from "@galacticcouncil/ui/utils";
import { HOLLAR_ASSET_ID } from "@galacticcouncil/utils";
import { useTheme } from "@galacticcouncil/ui/theme";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { FC } from "react";

import bullStrategyIcon from "@/assets/strategies/bull_strategy.svg";
import bearStrategyIcon from "@/assets/strategies/bear_strategy.svg";
import decentralLogo from "@/assets/strategies/decentral_logo.svg";
import eurcLogo from "@/assets/strategies/eurc_logo.svg";
import gdotLogo from "@/assets/strategies/gdot_logo.svg";
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
  const { themeProps: theme } = useTheme();
  const navigate = useNavigate();
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
        <Box
          sx={{ cursor: "pointer", display: "flex", alignItems: "center", mr: 2 }}
          onClick={() => navigate({ to: "/borrow/multiply" } as any)}
        >
          <ArrowLeft size={24} color={theme.text.high} />
        </Box>

        {collateralAsset.symbol === "WETH" ? (
          <img src={bullStrategyIcon} alt="Crypto Bull" style={{ width: 40, height: 40 }} />
        ) : collateralAsset.symbol === "WBTC" ? (
          <img src={bearStrategyIcon} alt="Crypto Bear" style={{ width: 40, height: 40 }} />
        ) : collateralAsset.symbol === "USDC" && debtAsset.symbol === "HUSD" ? (
          <img src={decentralLogo} alt="Decentral" style={{ width: 40, height: 40 }} />
        ) : collateralAsset.symbol === "GDOT" ? (
          <Flex style={{ position: "relative" }}>
            <img src={gdotLogo} alt="GDOT" style={{ width: 40, height: 40 }} />
            <div style={{ marginLeft: -12 }}>
              <AssetLogo id={getReserveAssetId(debtAsset)} size="large" />
            </div>
          </Flex>
        ) : collateralAsset.symbol === "EURC" ? (
          <img src={eurcLogo} alt="EURC" style={{ width: 40, height: 40 }} />
        ) : collateralAsset.symbol === "PRIME" ? (
          <Flex style={{ position: "relative" }}>
            <BaseAssetLogo src={primeLogo} size="large" alt="PRIME" />
            <div style={{ marginLeft: -12 }}>
              {debtAsset.symbol === "HUSD" ? (
                <AssetLogo id={HOLLAR_ASSET_ID} size="large" />
              ) : debtAsset.symbol === "EURC" ? (
                <img src={eurcLogo} alt="EURC" style={{ width: 40, height: 40 }} />
              ) : (
                <AssetLogo id={getReserveAssetId(debtAsset)} size="large" />
              )}
            </div>
          </Flex>
        ) : debtAsset.symbol === "EURC" ? (
          <Flex style={{ position: "relative" }}>
            <AssetLogo id={getReserveAssetId(collateralAsset)} size="large" />
            <div style={{ marginLeft: -12 }}>
              <img src={eurcLogo} alt="EURC" style={{ width: 40, height: 40 }} />
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
            {collateralAsset.symbol === "WETH"
              ? "Crypto Bull"
              : collateralAsset.symbol === "WBTC"
                ? "Crypto Bear"
                : collateralAsset.symbol === "USDC" && debtAsset.symbol === "HUSD"
                  ? "Decentral"
                  : collateralAsset.symbol === "EURC"
                    ? "EURC"
                    : `${collateralAsset.symbol} Loop`}
          </Text>

          <Text fs="p3" color={getToken("text.medium")}>
            {collateralAsset.symbol === "WETH"
              ? "Take a bullish position on ETH with leveraged exposure."
              : collateralAsset.symbol === "WBTC"
                ? "Take a bearish position on BTC with leveraged exposure."
                : collateralAsset.symbol === "USDC" && debtAsset.symbol === "HUSD"
                  ? "Earn yield from tokenized invoice financing."
                  : `Supply ${collateralAsset.symbol} and borrow ${debtAsset.symbol} to amplify yield.`}
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
