import { ChevronDown } from "@galacticcouncil/ui/assets/icons"
import {
  AssetLogo as BaseAssetLogo,
  Button,
  CollapsibleContent,
  CollapsibleRoot,
  CollapsibleTrigger,
  Flex,
  Icon,
  Paper,
  Stack,
  Text,
  ValueStats,
} from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { getToken, getTokenPx } from "@galacticcouncil/ui/utils"
import { HOLLAR_ASSET_ID } from "@galacticcouncil/utils"
import { ArrowDown, ArrowUp } from "lucide-react"
import { FC, useState } from "react"

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

  const selectedPosition = positions.find((p) => p.id === selectedPositionId)

  // Calculate total value (mock - in production would use real prices)
  const totalValue = positions
    .reduce((sum, pos) => sum + Number(pos.collateralAmount) * 0.12, 0)
    .toFixed(2)

  if (positions.length === 0) return null

  return (
    <>
      <CollapsibleRoot open={expanded}>
        <Paper sx={{ overflow: "hidden" }}>
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
                Your Positions
              </Text>

              <Flex align="center" gap={getTokenPx("scales.paddings.s")}>
                <Text fs="p5" fw={500} color={getToken("text.low")}>
                  {expanded ? "Show Less" : "Show More"}
                </Text>
                <Icon
                  component={ChevronDown}
                  size={18}
                  color={getToken("text.low")}
                  sx={{
                    transition: getToken("transitions.transform"),
                    transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </Flex>
            </Flex>
          </CollapsibleTrigger>

          {/* Stats Row */}
          <Flex
            justify="space-between"
            align="center"
            sx={{
              px: getTokenPx("containers.paddings.primary"),
              py: getTokenPx("containers.paddings.secondary"),
              borderBottom: expanded ? "1px solid" : "none",
              borderColor: getToken("details.separators"),
            }}
          >
            <ValueStats
              label="Total Value"
              customValue={
                <Text
                  font="primary"
                  fs="h7"
                  lh={1}
                  fw={700}
                  color={getToken("text.high")}
                >
                  ${totalValue}
                </Text>
              }
              size="medium"
            />
            <Text fs="p4" color={theme.text.medium}>
              {positions.length} position{positions.length > 1 ? "s" : ""}
            </Text>
          </Flex>

          {/* Position List */}
          <CollapsibleContent>
            <Stack gap={0}>
              {positions.map((position) => (
                <PositionRow
                  key={position.id}
                  position={position}
                  onManage={() => setSelectedPositionId(position.id)}
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
}> = ({ position, onManage }) => {
  const { themeProps: theme } = useTheme()
  const isBull = position.strategy === "bull"

  // Mock P&L calculation (would be real in production)
  const mockPnl = isBull ? "+$12.50" : "-$5.20"
  const pnlColor = isBull
    ? theme.accents.success.emphasis
    : theme.accents.danger.emphasis

  return (
    <Flex
      align="center"
      justify="space-between"
      sx={{
        px: getTokenPx("containers.paddings.primary"),
        py: getTokenPx("containers.paddings.secondary"),
        borderBottom: "1px solid",
        borderColor: getToken("details.separators"),
        "&:last-child": { borderBottom: "none" },
        "&:hover": { bg: theme.surfaces.containers.mid.primary },
      }}
    >
      {/* Asset Pair + Strategy */}
      <Flex align="center" gap={3}>
        <Flex
          sx={{
            position: "relative",
            width: 40,
            height: 24,
          }}
        >
          {position.collateralAsset?.symbol === "PRIME" ? (
            <BaseAssetLogo
              src={primeLogo}
              size="small"
              sx={{ position: "absolute", left: 0, zIndex: 1 }}
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
          ) : (
            <AssetLogo
              id={position.debtAsset?.id ?? "0"}
              size="small"
              sx={{ position: "absolute", left: 16, zIndex: 0 }}
            />
          )}
        </Flex>
        <Flex direction="column" gap={1}>
          <Flex align="center" gap={2}>
            <Text fs="p3" fw={500}>
              {position.collateralAsset?.symbol ?? "--"} /{" "}
              {position.debtAsset?.symbol === "CASH"
                ? "HUSD"
                : (position.debtAsset?.symbol ?? "--")}
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
              }}
            >
              {isBull ? (
                <ArrowUp size={10} strokeWidth={3} color="white" />
              ) : (
                <ArrowDown size={10} strokeWidth={3} color="white" />
              )}
            </Flex>
          </Flex>
          <Text fs="p5" color={theme.text.medium}>
            {position.leverage.toFixed(1)}x Leverage
          </Text>
        </Flex>
      </Flex>

      {/* P&L + Manage */}
      <Flex align="center" gap={4}>
        <Flex direction="column" align="flex-end">
          <Text fs="p4" fw={500} color={pnlColor}>
            {mockPnl}
          </Text>
          <Text fs="p5" color={theme.text.medium}>
            P&L
          </Text>
        </Flex>
        <Button size="small" variant="secondary" onClick={onManage}>
          Manage
        </Button>
      </Flex>
    </Flex>
  )
}
