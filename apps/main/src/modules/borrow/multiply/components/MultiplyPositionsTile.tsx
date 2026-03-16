import {
  AssetLogo as BaseAssetLogo,
  Box,
  Button,
  CollapsibleContent,
  CollapsibleRoot,
  CollapsibleTrigger,
  Flex,
  Paper,
  Stack,
  Text,
} from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { getToken, getTokenPx } from "@galacticcouncil/ui/utils"
import { HOLLAR_ASSET_ID } from "@galacticcouncil/utils"

import { ChevronDown, CircleStop } from "lucide-react"
import { FC, useState } from "react"

import eurcLogo from "@/assets/strategies/eurc_logo.svg"
import primeLogo from "@/assets/tokens/prime.png"
import { AssetLogo } from "@/components/AssetLogo"
import { PositionActionsModal } from "@/modules/borrow/multiply/components/PositionActionsModal"
import {
  SimulatedPosition,
  useMultiplySimulationStore,
} from "@/modules/borrow/multiply/states/useMultiplySimulationStore"

export const MultiplyPositionsTile: FC = () => {
  const { themeProps: theme } = useTheme()
  const { positions, removePosition, updatePosition } =
    useMultiplySimulationStore()
  const [expanded, setExpanded] = useState(true)
  const [selectedPositionId, setSelectedPositionId] = useState<string | null>(
    null,
  )
  const [modalMode, setModalMode] = useState<"adjust" | "close">("adjust")

  const selectedPosition = positions.find((p) => p.id === selectedPositionId)

  if (positions.length === 0) return null

  return (
    <>
      <CollapsibleRoot open={expanded}>
        <Paper sx={{ overflow: "hidden", minWidth: 0 }}>
          {/* Header */}
          <CollapsibleTrigger
            onClick={() => setExpanded(!expanded)}
            sx={{ cursor: "pointer", width: "100%" }}
          >
            <Flex
              align="center"
              justify="space-between"
              sx={{
                px: getTokenPx("containers.paddings.primary"),
                py: getTokenPx("containers.paddings.secondary"),
                borderBottom: expanded ? "1px solid" : "none",
                borderColor: getToken("details.separators"),
              }}
            >
              <Text
                fs="p3"
                fw={500}
                font="primary"
                color={getToken("text.high")}
              >
                My positions
              </Text>

              <Flex align="center" gap={getTokenPx("scales.paddings.xs")}>
                <Text fs="p5" fw={500} color={getToken("text.medium")}>
                  {expanded ? "Hide positions" : "Show positions"}
                </Text>
                <ChevronDown
                  size={18}
                  style={{
                    color: theme.text.medium,
                    transition: theme.transitions.transform,
                    transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </Flex>
            </Flex>
          </CollapsibleTrigger>

          {/* Table Headers */}
          <CollapsibleContent>
            <Flex
              align="center"
              justify="space-between"
              sx={{
                px: getTokenPx("containers.paddings.primary"),
                py: theme.scales.paddings.s,
                borderBottom: "1px solid",
                borderColor: getToken("details.separators"),
                bg: theme.surfaces.containers.high.primary,
                minWidth: 0,
              }}
            >
              <Text
                fs="p6"
                fw={500}
                color={theme.text.medium}
                sx={{
                  flex: ["1 1 0", "0 0 auto"],
                  minWidth: [0, 170],
                  width: ["auto", 170],
                }}
              >
                Position
              </Text>
              <Text
                fs="p6"
                fw={500}
                color={theme.text.medium}
                sx={{
                  flex: ["0 1 auto", "0 0 auto"],
                  minWidth: [0, 130],
                  width: ["auto", 130],
                }}
              >
                Value
              </Text>
              <Text
                fs="p6"
                fw={500}
                color={theme.text.medium}
                sx={{ width: 130, display: ["none", "block"] }}
              >
                Amount
              </Text>
              <Text
                fs="p6"
                fw={500}
                color={theme.text.medium}
                sx={{
                  flex: ["0 0 auto", "0 0 auto"],
                  minWidth: [50, 80],
                  width: ["auto", 80],
                }}
              >
                PNL (%)
              </Text>
              <Text
                fs="p6"
                fw={500}
                color={theme.text.medium}
                sx={{ width: 114, textAlign: "right", display: ["none", "block"] }}
              >
                Actions
              </Text>
            </Flex>

            {/* Position List */}
            <Stack gap={0}>
              {positions.map((position) => (
                <PositionRow
                  key={position.id}
                  position={position}
                  onManage={() => {
                    setSelectedPositionId(position.id)
                    setModalMode("close")
                  }}
                  onClose={() => {
                    setSelectedPositionId(position.id)
                    setModalMode("close")
                  }}
                />
              ))}
            </Stack>
          </CollapsibleContent>
        </Paper>
      </CollapsibleRoot>

      {selectedPosition && (
        <PositionActionsModal
          isOpen={!!selectedPosition}
          onClose={() => setSelectedPositionId(null)}
          position={selectedPosition}
          initialTab={modalMode}
          showTabs={modalMode === "adjust"}
          onUpdate={(updates) => updatePosition(selectedPosition.id, updates)}
          onClosePosition={() => {
            removePosition(selectedPosition.id)
            setSelectedPositionId(null)
          }}
        />
      )}
    </>
  )
}

const PositionRow: FC<{
  position: SimulatedPosition
  onManage: () => void
  onClose: () => void
}> = ({ position, onManage, onClose }) => {
  const { themeProps: theme } = useTheme()

  // Mock data for the new columns
  const mockValue = "$" + (Number(position.collateralAmount) * 0.12).toFixed(2)
  const mockPnl = "+$52.24"
  const mockPnlPercent = "(5.45%)"
  const pnlColor = theme.accents.success.emphasis

  return (
    <Flex
      align="center"
      justify="space-between"
      onClick={onManage}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onManage()
        }
      }}
      sx={{
        px: getTokenPx("containers.paddings.primary"),
        py: getTokenPx("containers.paddings.secondary"),
        borderBottom: "1px solid",
        borderColor: getToken("details.separators"),
        "&:last-child": { borderBottom: "none" },
        cursor: "pointer",
        "&:hover": { bg: theme.surfaces.containers.high.hover },
        minWidth: 0,
      }}
    >
      {/* 1. Position */}
      <Flex
        align="center"
        gap={3}
        sx={{
          flex: ["1 1 0", "0 0 auto"],
          minWidth: [0, 170],
          width: ["auto", 170],
        }}
      >
        {/* Asset Logos */}
        <Flex
          sx={{
            position: "relative",
            minWidth: 40,
            height: 24,
          }}
        >
          {position.collateralAsset?.symbol === "PRIME" ? (
            <BaseAssetLogo
              src={primeLogo}
              size="small"
              sx={{ position: "absolute", left: 0, zIndex: 1 }}
            />
          ) : position.collateralAsset?.symbol === "EURC" ? (
            <img
              src={eurcLogo}
              alt="EURC"
              style={{ width: 24, height: 24, position: "absolute", left: 0, zIndex: 1 }}
            />
          ) : (
            <AssetLogo
              id={position.collateralAsset?.id ?? "0"}
              size="small"
              sx={{ position: "absolute", left: 0, zIndex: 1 }}
            />
          )}
          {position.debtAsset?.symbol === "HUSD" ||
            position.debtAsset?.symbol === "CASH" ? (
            <AssetLogo
              id={HOLLAR_ASSET_ID}
              size="small"
              sx={{ position: "absolute", left: 16, zIndex: 0 }}
            />
          ) : position.debtAsset?.symbol === "EURC" ? (
            <img
              src={eurcLogo}
              alt="EURC"
              style={{ width: 24, height: 24, position: "absolute", left: 16, zIndex: 0 }}
            />
          ) : (
            <AssetLogo
              id={position.debtAsset?.id ?? "0"}
              size="small"
              sx={{ position: "absolute", left: 16, zIndex: 0 }}
            />
          )}
        </Flex>
        <Flex direction="column">
          <Text fs="p3" fw={500}>
            {position.collateralAsset?.symbol ?? "--"}/
            {position.debtAsset?.symbol === "CASH"
              ? "HUSD"
              : (position.debtAsset?.symbol ?? "--")}
          </Text>
          <Text fs="p6" color={theme.text.medium}>
            {position.leverage.toFixed(1)}x Leverage
          </Text>
        </Flex>
      </Flex>

      {/* 2. Value */}
      <Box
        sx={{
          flex: ["0 1 auto", "0 0 auto"],
          minWidth: [0, 130],
          width: ["auto", 130],
        }}
      >
        <Text fs="p5" fw={600} color={theme.text.high}>
          {mockValue}
        </Text>
      </Box>

      {/* 3. Amount - hidden on mobile */}
      <Box sx={{ width: 130, display: ["none", "block"] }}>
        <Text fs="p5" fw={600} color={theme.text.high}>
          {Number(position.collateralAmount).toFixed(0)}{" "}
          {position.collateralAsset?.symbol}
        </Text>
      </Box>

      {/* 4. PNL (%) */}
      <Flex
        direction="column"
        sx={{
          flex: ["0 0 auto", "0 0 auto"],
          minWidth: [50, 80],
          width: ["auto", 80],
        }}
      >
        <Text fs="p5" fw={600} color={pnlColor}>
          {mockPnl}
        </Text>
        <Text fs="p6" color={theme.text.medium}>
          {mockPnlPercent}
        </Text>
      </Flex>

      {/* 5. Actions - hidden on mobile */}
      <Flex
        align="center"
        justify="flex-end"
        gap={3}
        sx={{ width: 114, display: ["none", "flex"] }}
      >
        <Button
          size="small"
          variant="tertiary"
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
        >
          <CircleStop size={14} />
          Close
        </Button>
      </Flex>
    </Flex>
  )
}
