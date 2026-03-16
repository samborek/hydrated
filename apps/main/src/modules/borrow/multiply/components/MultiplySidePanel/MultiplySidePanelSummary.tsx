import { ComputedReserveData } from "@galacticcouncil/money-market/hooks";
import { Flex, Separator, Stack, Text } from "@galacticcouncil/ui/components";
import { useTheme } from "@galacticcouncil/ui/theme";
import { getTokenPx } from "@galacticcouncil/ui/utils";
import { FC } from "react";

import eurcLogo from "@/assets/strategies/eurc_logo.svg";
import { AssetLogo } from "@/components/AssetLogo";
import { getReserveAssetId } from "@/modules/borrow/utils/assets";

export type MultiplySidePanelSummaryProps = {
  collateralAsset: ComputedReserveData;
  debtAsset: ComputedReserveData;
  leverage: number;
  netApy: number;
  buyingPower: number;
  debtAmount: number;
  collateralPrice?: number;
  healthFactor?: number;
  liquidationPrice?: number;
};

const SimpleSummaryRow = ({
  label,
  value,
  valueColor,
  icon,
}: {
  label: string;
  value: string;
  valueColor?: string;
  icon?: React.ReactNode;
}) => {
  const { themeProps: theme } = useTheme();
  return (
    <Flex
      justify="space-between"
      align="center"
      py={getTokenPx("scales.paddings.s")}
    >
      <Text fs="p5" color={theme.text.medium}>
        {label}
      </Text>
      <Flex align="center" gap={getTokenPx("scales.paddings.xs")}>
        <Text fs="p5" fw={500} color={valueColor || theme.text.high}>
          {value}
        </Text>
        {icon}
      </Flex>
    </Flex>
  );
};

export const MultiplySidePanelSummary: FC<MultiplySidePanelSummaryProps> = ({
  collateralAsset,
  leverage,
  netApy,
  buyingPower,
  collateralPrice = 1000,
  healthFactor = 1.88,
  liquidationPrice,
}) => {
  const { themeProps: theme } = useTheme();

  // Calculate derived values
  const totalFees = buyingPower > 0 ? (buyingPower * 0.001).toFixed(2) : "0.00";
  const minReceived = buyingPower > 0 ? buyingPower.toFixed(2) : "0.00";
  const yieldPercent = netApy > 0 ? netApy.toFixed(2) : "0.00";

  // Calculate liquidation price (simplified - typically based on LTV threshold)
  const liqPrice = liquidationPrice || collateralPrice * 0.8;
  const liqPriceChange = ((liqPrice / collateralPrice - 1) * 100).toFixed(2);

  // Calculate projected health factor after position
  const projectedHF =
    buyingPower > 0
      ? Math.max(1.0, healthFactor - (leverage - 1) * 0.1).toFixed(2)
      : healthFactor.toFixed(2);

  const hfColor =
    Number(projectedHF) < 1.2
      ? theme.accents.danger.emphasis
      : Number(projectedHF) < 1.5
        ? theme.accents.alertAlt.primary
        : theme.accents.success.emphasis;

  return (
    <Stack gap={0} mt={getTokenPx("scales.paddings.m")}>
      <Separator mb={getTokenPx("scales.paddings.s")} />

      <SimpleSummaryRow label="Total fees" value={`$${totalFees}`} />
      <Separator />

      <SimpleSummaryRow
        label="Minimal received"
        value={`${minReceived} ${collateralAsset?.symbol || "PRIME"}`}
      />
      <Separator />

      {/* Yield */}
      <Flex
        justify="space-between"
        align="center"
        py={getTokenPx("containers.paddings.quint")}
      >
        <Text fs="p5" color={theme.text.medium}>
          Yield
        </Text>
        <Flex align="center" gap={getTokenPx("scales.paddings.xs")}>
          <Text fs="p5" fw={500} color={theme.accents.success.emphasis}>
            Up to {yieldPercent}%
          </Text>
          {collateralAsset && (
            collateralAsset.symbol === "EURC" ? (
              <img src={eurcLogo} alt="EURC" style={{ width: 20, height: 20 }} />
            ) : (
              <AssetLogo id={getReserveAssetId(collateralAsset)} size="small" />
            )
          )}
        </Flex>
      </Flex>
      <Separator />

      <SimpleSummaryRow
        label="Price"
        value={`1 ${collateralAsset?.symbol || "DOT"} = $${collateralPrice.toLocaleString()}`}
      />
      <Separator />

      <SimpleSummaryRow
        label="Liquidation price"
        value={`$${liqPrice.toFixed(2)} (${liqPriceChange}%)`}
      />
      <Separator />

      {/* Health Factor */}
      <Flex
        justify="space-between"
        align="center"
        py={getTokenPx("containers.paddings.quint")}
      >
        <Text fs="p5" color={theme.text.medium}>
          Health factor
        </Text>
        <Stack gap={0} align="flex-end">
          <Text fs="p5" fw={600} color={hfColor}>
            {healthFactor.toFixed(2)} → {projectedHF}
          </Text>
          <Text fs="p6" color={theme.text.medium}>
            Liquidation at &lt;1.0
          </Text>
        </Stack>
      </Flex>
    </Stack>
  );
};
