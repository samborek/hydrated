import {
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
import { FC, useState } from "react"
import { toast } from "sonner"

import { MultiplySidePanel } from "@/modules/borrow/multiply/components/MultiplySidePanel/MultiplySidePanel"
import { SimulatedPosition } from "@/modules/borrow/multiply/states/useMultiplySimulationStore"

interface PositionActionsModalProps {
  isOpen: boolean
  onClose: () => void
  position: SimulatedPosition
  onUpdate: (updates: Partial<SimulatedPosition>) => void
  onClosePosition: () => void
}

export const PositionActionsModal: FC<PositionActionsModalProps> = ({
  isOpen,
  onClose,
  position,
  onUpdate,
  onClosePosition,
}) => {
  const { themeProps: theme } = useTheme()
  const [activeTab, setActiveTab] = useState<"adjust" | "close">("adjust")

  const handleClosePosition = () => {
    onClosePosition()
    toast.success("Position closed", {
      description: `Sold ${position.collateralAmount} ${position.collateralAsset.symbol}`,
    })
  }

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalHeader
        title={`Manage ${position.collateralAsset.symbol} / ${position.debtAsset.symbol}`}
      />
      <ModalBody>
        <Stack gap={getTokenPx("scales.paddings.l")(theme as never)}>
          {/* Tabs */}
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
            <Stack gap={getTokenPx("scales.paddings.m")(theme as never)}>
              <div
                style={{
                  padding: "16px",
                  background: theme.accents.danger.secondary,
                  borderRadius: "8px",
                  border: `1px solid ${theme.accents.danger.emphasis}`,
                }}
              >
                <Text fs="p3" color={theme.accents.danger.onPrimary}>
                  Are you sure you want to close this position?
                </Text>
                <Text fs="p5" color={theme.accents.danger.onPrimary} mt={1}>
                  This will sell your collateral and repay the debt.
                </Text>
              </div>
              <Button
                sx={{ width: "100%" }}
                size="large"
                variant="danger"
                onClick={handleClosePosition}
              >
                Confirm Close
              </Button>
            </Stack>
          )}
        </Stack>
      </ModalBody>
    </Modal>
  )
}
