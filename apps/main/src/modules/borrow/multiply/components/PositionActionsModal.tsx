import {
  AssetLogo as BaseAssetLogo,
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalHeader,
  Stack,
  Text,
} from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { getTokenPx } from "@galacticcouncil/ui/utils"
import { HOLLAR_ASSET_ID } from "@galacticcouncil/utils"
import { ArrowDown, ArrowUp } from "lucide-react"
import { FC, useState } from "react"
import { toast } from "sonner"

import eurcLogo from "@/assets/strategies/eurc_logo.svg"
import primeLogo from "@/assets/tokens/prime.png"
import { AssetLogo } from "@/components/AssetLogo"
import { MultiplySidePanel } from "@/modules/borrow/multiply/components/MultiplySidePanel/MultiplySidePanel"
import { SimulatedPosition } from "@/modules/borrow/multiply/states/useMultiplySimulationStore"

interface PositionActionsModalProps {
  isOpen: boolean
  onClose: () => void
  position: SimulatedPosition
  onUpdate: (updates: Partial<SimulatedPosition>) => void
  onClosePosition: () => void
  initialTab?: "adjust" | "close"
  showTabs?: boolean
}

export const PositionActionsModal: FC<PositionActionsModalProps> = ({
  isOpen,
  onClose,
  position,
  onUpdate,
  onClosePosition,
  initialTab = "adjust",
  showTabs = true,
}) => {
  const { themeProps: theme } = useTheme()
  const [activeTab, setActiveTab] = useState<"adjust" | "close">(initialTab)

  const handleClosePosition = () => {
    onClosePosition()
    toast.success("Position closed", {
      description: `Sold ${position.collateralAmount} ${position.collateralAsset.symbol}`,
    })
  }

  const isBull = position.strategy === "bull" || !position.strategy
  const isPrime = position.collateralAsset.symbol === "PRIME"
  const mockPnl = position.pnl ? Number(position.pnl) : Math.random() * 20 - 5
  const isPositive = mockPnl >= 0

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalHeader
        title={
          activeTab === "close" && !showTabs
            ? "Close Position"
            : `Manage ${position.collateralAsset.symbol} / ${position.debtAsset.symbol}`
        }
      />
      <ModalBody>
        <Stack gap={getTokenPx("scales.paddings.l")(theme as never)}>
          {/* Tabs */}
          {showTabs && (
            <Flex gap={2}>
              <Button
                size="small"
                variant={activeTab === "adjust" ? "primary" : "secondary"}
                onClick={() => setActiveTab("adjust")}
              >
                Adjust
              </Button>
              <Button
                size="small"
                variant={activeTab === "close" ? "danger" : "secondary"}
                onClick={() => setActiveTab("close")}
              >
                Close
              </Button>
            </Flex>
          )}

          {activeTab === "adjust" ? (
            <MultiplySidePanel
              collateralAsset={position.collateralAsset as any}
              debtAsset={position.debtAsset as any}
              initialCollateralAmount={position.collateralAmount}
              initialLeverage={position.leverage}
              initialStrategy={position.strategy}
              isEditing
              actionLabel="Update Position"
              onAction={(data) => {
                onUpdate({
                  collateralAmount: data.collateralAmount,
                  leverage: data.leverage,
                  strategy: data.strategy,
                  netApy: position.netApy * (data.leverage / position.leverage),
                })
                toast.success("Position updated", {
                  description: `Leverage changed to ${data.leverage.toFixed(2)}x`,
                })
                onClose()
              }}
            />
          ) : (
            <Stack gap={getTokenPx("scales.paddings.l")(theme as never)}>
              {/* Position details matching the list view - NO CONTAINER */}
              <Flex direction="column" gap={getTokenPx("scales.paddings.l")(theme as never)}>
                {/* Row 1: Assets & Status */}
                <Flex justify="space-between" align="center">
                  <Flex align="center" gap={getTokenPx("scales.paddings.base")}>
                    <Flex>
                      {isPrime ? (
                        <BaseAssetLogo src={primeLogo} size="medium" alt="PRIME" />
                      ) : position.collateralAsset.symbol === "EURC" ? (
                        <img src={eurcLogo} alt="EURC" style={{ width: 32, height: 32 }} />
                      ) : (
                        <AssetLogo id={position.collateralAsset.id} size="medium" />
                      )}
                      <div style={{ marginLeft: `-${theme.scales.paddings.m}px` }}>
                        {position.debtAsset.symbol === "HUSD" ||
                          position.debtAsset.symbol === "CASH" ? (
                          <AssetLogo id={HOLLAR_ASSET_ID} size="medium" />
                        ) : position.debtAsset.symbol === "EURC" ? (
                          <img src={eurcLogo} alt="EURC" style={{ width: 32, height: 32 }} />
                        ) : (
                          <AssetLogo id={position.debtAsset.id} size="medium" />
                        )}
                      </div>
                    </Flex>
                    <Flex direction="column">
                      <Flex align="center" gap={1}>
                        <Text fs="p3" fw={600}>
                          {position.collateralAsset.symbol} /{" "}
                          {position.debtAsset.symbol === "CASH"
                            ? "HUSD"
                            : position.debtAsset.symbol}
                        </Text>
                        <Flex
                          align="center"
                          justify="center"
                          sx={{
                            width: 16,
                            height: 16,
                            borderRadius: "full",
                            bg: isBull
                              ? theme.accents.success.emphasis
                              : theme.accents.danger.emphasis,
                            color: isBull
                              ? theme.accents.success.onEmphasis
                              : theme.accents.danger.onPrimary,
                          }}
                        >
                          {isBull ? (
                            <ArrowUp size={10} strokeWidth={3} />
                          ) : (
                            <ArrowDown size={10} strokeWidth={3} />
                          )}
                        </Flex>
                      </Flex>
                      <Text fs="p6" color={theme.text.low}>
                        {position.leverage.toFixed(2)}x Leverage
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex direction="column" align="flex-end">
                    <Text
                      fw={600}
                      color={
                        isPositive
                          ? theme.details.values.positive
                          : theme.details.values.negative
                      }
                    >
                      {isPositive ? "+" : "-"}${Math.abs(mockPnl).toFixed(2)}
                    </Text>
                    <Text fs="p6" color={theme.text.low}>
                      P&L (Est.)
                    </Text>
                  </Flex>
                </Flex>

                <Box
                  sx={{
                    height: "1px",
                    width: "calc(100% + 2 * var(--modal-content-padding, 20px))",
                    marginInline: "var(--modal-content-inset, -20px)",
                    background: theme.details.separators,
                    my: 0,
                  }}
                />

                {/* Row 2: Basic Stats */}
                <Flex justify="space-between">
                  <Flex direction="column" gap={1}>
                    <Text fs="p6" color={theme.text.low}>
                      Collateral
                    </Text>
                    <Text fs="p4" fw={500}>
                      {Number(position.collateralAmount).toFixed(2)}{" "}
                      {position.collateralAsset.symbol}
                    </Text>
                  </Flex>
                  <Flex direction="column" gap={1} align="flex-end">
                    <Text fs="p6" color={theme.text.low}>
                      Net APY
                    </Text>
                    <Text fs="p4" fw={600} color={theme.details.values.positive}>
                      {position.netApy.toFixed(2)}%
                    </Text>
                  </Flex>
                </Flex>

                <Box
                  sx={{
                    height: "1px",
                    width: "calc(100% + 2 * var(--modal-content-padding, 20px))",
                    marginInline: "var(--modal-content-inset, -20px)",
                    background: theme.details.separators,
                    my: 0,
                  }}
                />

                {/* Row 3: Prices */}
                <Flex justify="space-between">
                  <Flex direction="column" gap={1}>
                    <Text fs="p6" color={theme.text.low}>
                      Entry Price
                    </Text>
                    <Text fs="p4" fw={500}>
                      ${Number(position.entryPrice || 0).toFixed(2)}
                    </Text>
                  </Flex>
                  <Flex direction="column" gap={1} align="flex-end">
                    <Text fs="p6" color={theme.text.low}>
                      Liquidation Price
                    </Text>
                    <Text fs="p4" fw={500} color={theme.accents.danger.emphasis}>
                      ${Number(position.liquidationPrice || 0).toFixed(2)}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>

              <Text
                fs="p5"
                color={theme.text.medium}
                sx={{ textAlign: "center", mt: 4 }}
              >
                Are you sure you want to close this position? This will sell your
                collateral and repay the debt.
              </Text>

              <Button
                sx={{ width: "100%" }}
                size="large"
                variant="danger"
                onClick={handleClosePosition}
              >
                Close Position
              </Button>
            </Stack>
          )}
        </Stack>
      </ModalBody>
    </Modal>
  )
}
