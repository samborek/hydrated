import {
    AssetLogo as BaseAssetLogo,
    Button,
    DataTable,
    Flex,
    Text,
} from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { getTokenPx } from "@galacticcouncil/ui/utils"
import { createColumnHelper } from "@tanstack/react-table"
import { FC, useMemo } from "react"

import primeLogo from "@/assets/tokens/prime.png"
import { AssetLogo } from "@/components/AssetLogo"
import {
    SimulatedPosition,
    useMultiplySimulationStore,
} from "../states/useMultiplySimulationStore"

export const MyPositionsTable: FC = () => {
    const { themeProps: theme } = useTheme()
    const { positions, removePosition } = useMultiplySimulationStore()

    const columnHelper = createColumnHelper<SimulatedPosition>()

    const columns = useMemo(
        () => [
            columnHelper.accessor("collateralAsset", {
                header: "Position",
                cell: ({ row }) => {
                    const p = row.original
                    const isPrime = p.collateralAsset.symbol === "PRIME"
                    return (
                        <Flex align="center" gap={getTokenPx("scales.paddings.base")}>
                            <Flex>
                                {isPrime ? (
                                    <BaseAssetLogo src={primeLogo} size="medium" alt="PRIME" />
                                ) : (
                                    <AssetLogo id={p.collateralAsset.id} size="medium" />
                                )}
                                <div
                                    style={{
                                        marginLeft: `-${theme.scales.paddings.m}px`,
                                    }}
                                >
                                    <AssetLogo id={p.debtAsset.id} size="medium" />
                                </div>
                            </Flex>
                            <Flex direction="column">
                                <Text fs="p3" fw={500}>
                                    {p.collateralAsset.symbol} / {p.debtAsset.symbol}
                                </Text>
                                <Text fs="p5" color={theme.text.low}>
                                    {p.leverage.toFixed(2)}x Leverage
                                </Text>
                            </Flex>
                        </Flex>
                    )
                },
                meta: {
                    sx: { width: "30%" },
                },
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
                meta: {
                    sx: { width: "20%" },
                },
            }),
            columnHelper.accessor("debtAmount", {
                header: "Debt",
                cell: ({ row }) => {
                    const p = row.original
                    return (
                        <Text fs="p3" fw={500}>
                            {Number(p.debtAmount).toFixed(2)} {p.debtAsset.symbol}
                        </Text>
                    )
                },
                meta: {
                    sx: { width: "20%" },
                },
            }),
            columnHelper.accessor("netApy", {
                header: "Net APY",
                cell: ({ getValue }) => (
                    <Text color={theme.details.values.positive} fw={600}>
                        {getValue().toFixed(2)}%
                    </Text>
                ),
                meta: {
                    sx: { width: "15%" },
                },
            }),
            columnHelper.display({
                id: "actions",
                header: "",
                cell: ({ row }) => (
                    <Flex justify="flex-end" width="100%">
                        <Button
                            size="small"
                            variant="danger"
                            onClick={() => removePosition(row.original.id)}
                        >
                            Close
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
        [theme, removePosition, columnHelper],
    )

    if (positions.length === 0) return null

    return (
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
    )
}
