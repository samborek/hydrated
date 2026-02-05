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

import { MultiplySidePanelLeverage } from "@/modules/borrow/multiply/components/MultiplySidePanel/MultiplySidePanelLeverage"
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
  const [leverage, setLeverage] = useState(position.leverage)
  const [activeTab, setActiveTab] = useState<"adjust" | "close">("adjust")

  const handleUpdate = () => {
    onUpdate({
      leverage,
      // Recalculate debt/buying power based on new leverage (simplified for simulation)
      netApy: position.netApy * (leverage / position.leverage), // Mock APY change
    })
    toast.success("Position updated", {
      description: `Leverage changed to ${leverage.toFixed(2)}x`,
    })
    onClose()
  }

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
            <Stack gap={getTokenPx("scales.paddings.m")(theme as never)}>
              <Text fs="p3" color={theme.text.medium}>
                Adjust Leverage
              </Text>
              <MultiplySidePanelLeverage
                value={leverage}
                onChange={setLeverage}
                min={1.1}
                max={5}
              />
              <Flex justify="space-between" align="center" mt={2}>
                <Text fs="p4" color={theme.text.medium}>
                  Current: {position.leverage.toFixed(2)}x
                </Text>
                <Text fs="p4" color={theme.accents.success.emphasis}>
                  New: {leverage.toFixed(2)}x
                </Text>
              </Flex>
              <Button
                sx={{ width: "100%" }}
                size="large"
                onClick={handleUpdate}
                disabled={leverage === position.leverage}
              >
                Update Position
              </Button>
            </Stack>
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
