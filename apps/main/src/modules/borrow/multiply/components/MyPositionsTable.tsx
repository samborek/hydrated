import {
  AssetLogo as BaseAssetLogo,
  Button,
  DataTable,
  Flex,
  Text,
} from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { getTokenPx } from "@galacticcouncil/ui/utils"
import { HOLLAR_ASSET_ID } from "@galacticcouncil/utils"
import { createColumnHelper } from "@tanstack/react-table"
import { ArrowDown, ArrowUp } from "lucide-react"
import { FC, useMemo, useState } from "react"

import primeLogo from "@/assets/tokens/prime.png"
import { AssetLogo } from "@/components/AssetLogo"
import { PositionActionsModal } from "@/modules/borrow/multiply/components/PositionActionsModal"
import {
  SimulatedPosition,
  useMultiplySimulationStore,
} from "@/modules/borrow/multiply/states/useMultiplySimulationStore"

export const MyPositionsTable: FC = () => {
  const { themeProps: theme } = useTheme()
  const { positions, removePosition, updatePosition } =
    useMultiplySimulationStore()
  const [selectedPositionId, setSelectedPositionId] = useState<string | null>(
    null,
  )

  const columnHelper = createColumnHelper<SimulatedPosition>()

  const columns = useMemo(
    () => [
      columnHelper.accessor("collateralAsset", {
        header: "Position",
        cell: ({ row }) => {
          const p = row.original
          const isPrime = p.collateralAsset.symbol === "PRIME"
          const isBull = p.strategy === "bull" || !p.strategy // Default to bull for legacy
          return (
            <Flex align="center" gap={getTokenPx("scales.paddings.base")}>
              <Flex>
                {isPrime ? (
                  <BaseAssetLogo src={primeLogo} size="medium" alt="PRIME" />
                ) : (
                  <AssetLogo id={p.collateralAsset.id} size="medium" />
                )}
                <div style={{ marginLeft: `-${theme.scales.paddings.m}px` }}>
                  {p.debtAsset.symbol === "HUSD" ||
                    p.debtAsset.symbol === "CASH" ? (
                    <AssetLogo id={HOLLAR_ASSET_ID} size="medium" />
                  ) : (
                    <AssetLogo id={p.debtAsset.id} size="medium" />
                  )}
                </div>
              </Flex>
              <Flex direction="column">
                <Flex align="center" gap={1}>
                  <Text fs="p3" fw={500}>
                    {p.collateralAsset.symbol} /{" "}
                    {p.debtAsset.symbol === "CASH"
                      ? "HUSD"
                      : p.debtAsset.symbol}
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
                <Text fs="p5" color={theme.text.low}>
                  {p.leverage.toFixed(2)}x Leverage
                </Text>
              </Flex>
            </Flex>
          )
        },
        meta: { sx: { width: "25%" } },
      }),
      columnHelper.accessor("collateralAmount", {
        header: "Collateral",
        cell: ({ row }) => {
          const p = row.original
          return (
            <Text fs="p3" fw={500}>
              {Number(p.collateralAmount).toFixed(2)} {p.collateralAsset.symbol}
            </Text>
          )
        },
        meta: { sx: { width: "15%" } },
      }),
      columnHelper.accessor("entryPrice", {
        header: "Entry Price",
        cell: ({ row }) => {
          const p = row.original
          const price = Number(p.entryPrice || 0)
          return (
            <Text fs="p3" fw={500}>
              ${price.toFixed(2)}
            </Text>
          )
        },
        meta: { sx: { width: "15%" } },
      }),
      columnHelper.accessor("netApy", {
        header: "Net APY",
        cell: ({ getValue }) => (
          <Text color={theme.details.values.positive} fw={600}>
            {getValue().toFixed(2)}%
          </Text>
        ),
        meta: { sx: { width: "15%" } },
      }),
      columnHelper.accessor("pnl", {
        header: "P&L (Est.)",
        cell: ({ row }) => {
          const p = row.original
          // Mock P&L calculation for demo purposes (simulate small fluctuation)
          // In real app, this would use live price vs entry price
          const mockPnl = p.pnl ? Number(p.pnl) : Math.random() * 20 - 5 // Mock random P&L
          const isPositive = mockPnl >= 0
          return (
            <Text
              fw={500}
              color={
                isPositive
                  ? theme.details.values.positive
                  : theme.details.values.negative
              }
            >
              {isPositive ? "+" : "-"}${Math.abs(mockPnl).toFixed(2)}
            </Text>
          )
        },
        meta: { sx: { width: "15%" } },
      }),
      columnHelper.display({
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <Flex justify="flex-end" width="100%" gap={2}>
            <Button
              size="small"
              variant="secondary"
              onClick={() => setSelectedPositionId(row.original.id)}
            >
              Manage
            </Button>
          </Flex>
        ),
        meta: {
          sx: {
            width: "15%",
            paddingRight: getTokenPx("containers.paddings.primary"),
          },
        },
      }),
    ],
    [theme, columnHelper],
  )

  if (positions.length === 0) return null

  const selectedPosition = positions.find((p) => p.id === selectedPositionId)

  return (
    <>
      <DataTable
        data={positions}
        columns={columns}
        sx={{
          "& table tbody td": {
            paddingTop: theme.scales.paddings.m,
            paddingBottom: theme.scales.paddings.m,
          },
        }}
      />
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
