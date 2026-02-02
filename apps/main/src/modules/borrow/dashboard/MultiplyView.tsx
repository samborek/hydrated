import { useMarketAssetsData } from "@galacticcouncil/money-market/hooks"
import {
  AssetLogo as BaseAssetLogo,
  Box,
  Button,
  DataTable,
  Flex,
  Grid,
  Text,
} from "@galacticcouncil/ui/components"
import { useBreakpoints, useTheme } from "@galacticcouncil/ui/theme"
import { css, styled } from "@galacticcouncil/ui/utils"
import { Link, useNavigate } from "@tanstack/react-router"
import { createColumnHelper } from "@tanstack/react-table"
import { GHO_ASSET_ID, isGho } from "@galacticcouncil/money-market/utils"
import {
  GDOT_ASSET_ID,
  GDOT_ERC20_ID,
  getAssetIdFromAddress,
  GETH_ASSET_ID,
  GETH_ERC20_ID,
  HOLLAR_ASSET_ID,
} from "@galacticcouncil/utils"
import { FC, useMemo } from "react"

import primeLogo from "@/assets/tokens/prime.png"
import { AssetLogo } from "@/components/AssetLogo"
import { useAssets } from "@/providers/assetsProvider"

const SSection = styled.section(
  ({ theme }) => css`
    background: ${theme.surfaces.containers.high.primary};
    border: 1px solid ${theme.details.borders};
    border-radius: 16px;
    padding: 0px;
    margin-bottom: 20px;
    overflow: hidden;

    /* Adjust table row padding here */
    & table tbody td {
      padding-top: 10px;
      padding-bottom: 10px;
    }
  `,
)

const SLoopCard = styled.div(
  ({ theme }) => css`
    background: ${theme.surfaces.containers.high.primary};
    border: 1px solid ${theme.details.borders};
    border-radius: 16px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
    color: inherit;
    height: 100%;

    &:hover {
      background: ${theme.surfaces.containers.high.hover};
      border-color: ${theme.colors.azureBlue[400]};
    }
  `,
)

const SBadge = styled.div(
  ({ theme }) => css`
    background: ${theme.colors.azureBlue[500]};
    color: ${theme.colors.azureBlue[900]};
    font-size: 11px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 4px;
    text-transform: uppercase;
    width: fit-content;
  `,
)

// Mock Strategies Config
const STRATEGIES = [
  { collateral: "DOT", debt: "USDC", leverage: 3 },
  { collateral: "WETH", debt: "USDC", leverage: 2.5 },
  { collateral: "WBTC", debt: "USDC", leverage: 2.5 },
  { collateral: "PRIME", debt: "HUSD", leverage: 3.5 },
]

type StrategyRow = {
  id: string
  collateralAsset: any
  debtAsset: any
  leverage: number
  netApy: number // Mocked calculation
}

export const MultiplyView: FC = () => {
  const { themeProps: theme } = useTheme()
  const { gte } = useBreakpoints()
  const { tokens } = useAssets()
  const navigate = useNavigate()

  const { data: marketAssets } = useMarketAssetsData()

  const strategies = useMemo(() => {
    const assets = marketAssets?.length ? marketAssets : []

    const getLogoId = (reserve: any) => {
      const assetId = isGho(reserve)
        ? GHO_ASSET_ID
        : getAssetIdFromAddress(reserve.underlyingAsset)

      const OVERRIDE_MAP: Record<string, string> = {
        [GDOT_ASSET_ID]: GDOT_ERC20_ID,
        [GETH_ASSET_ID]: GETH_ERC20_ID,
      }
      return OVERRIDE_MAP[assetId] ?? assetId
    }

    return STRATEGIES.map((s, idx) => {
      const collateralBase = assets.find((a) => a.symbol === s.collateral) as any
      let collateral: any

      if (collateralBase) {
        collateral = {
          ...collateralBase,
          logoId: getLogoId(collateralBase),
        }
      } else {
        const token = tokens.find((t) => t.symbol === s.collateral)
        collateral = {
          symbol: s.collateral,
          underlyingAsset: "0x0000000000000000000000000000000000000000",
          supplyAPY: 0.12,
          logoId: token?.id || "mock-id-c-" + idx,
          ...token,
        }
      }

      const debtBase = assets.find((a) => a.symbol === s.debt) as any
      let debt: any

      if (debtBase) {
        debt = {
          ...debtBase,
          logoId: getLogoId(debtBase),
        }
      } else {
        const token =
          tokens.find((t) => t.symbol === s.debt) ||
          (s.debt === "HUSD"
            ? tokens.find((t) => t.id === HOLLAR_ASSET_ID)
            : undefined)

        debt = {
          symbol: s.debt,
          underlyingAsset: "0x0000000000000000000000000000000000000001",
          variableBorrowRate: 0.05,
          logoId:
            token?.id ||
            (s.debt === "HUSD" ? HOLLAR_ASSET_ID : "mock-id-d-" + idx),
          ...token,
        }
      }

      const supplyApy = Number(collateral.supplyAPY) || 0
      const borrowApy = Number(debt.variableBorrowRate) || 0
      const netApy = supplyApy + (supplyApy - borrowApy) * (s.leverage - 1)

      return {
        id: `${s.collateral}-${s.debt}-${idx}`,
        collateralAsset: collateral,
        debtAsset: debt,
        leverage: s.leverage,
        netApy,
      }
    }).filter(Boolean) as StrategyRow[]
  }, [marketAssets, tokens])

  const columnHelper = createColumnHelper<StrategyRow>()

  const columns = [
    columnHelper.accessor("collateralAsset", {
      id: "supply",
      header: "Asset to Supply",
      meta: {
        sx: { width: "20%" },
      },
      cell: ({ row }) => {
        const s = row.original
        const supplyApy = Number(s.collateralAsset.supplyAPY) || 0
        const isPrime = s.collateralAsset.symbol === "PRIME"

        return (
          <Flex align="center" gap={10}>
            {isPrime ? (
              <BaseAssetLogo src={primeLogo} size="medium" alt="PRIME" />
            ) : (
              <AssetLogo id={s.collateralAsset.logoId} size="medium" />
            )}
            <Flex direction="column">
              <Text fs={14} fw={500}>
                {s.collateralAsset.symbol}
              </Text>
              <Text fs={12} color={theme.text.low}>
                APY: {supplyApy.toFixed(2)}%
              </Text>
            </Flex>
          </Flex>
        )
      },
    }),
    columnHelper.accessor("debtAsset", {
      id: "borrow",
      header: "Borrow Token",
      meta: {
        sx: { width: "20%" },
      },
      cell: ({ row }) => {
        const s = row.original
        const borrowApy = Number(s.debtAsset.variableBorrowRate) || 0
        return (
          <Flex align="center" gap={10}>
            <AssetLogo id={s.debtAsset.logoId} size="medium" />
            <Flex direction="column">
              <Text fs={14} fw={500}>
                {s.debtAsset.symbol}
              </Text>
              <Text fs={12} color={theme.text.low}>
                APY: {borrowApy.toFixed(2)}%
              </Text>
            </Flex>
          </Flex>
        )
      },
    }),
    columnHelper.accessor("netApy", {
      header: "Net APY",
      meta: {
        sx: { width: "20%" },
      },
      cell: ({ getValue }) => (
        <Text color={theme.details.values.positive} fw={600}>
          {getValue().toFixed(2)}%
        </Text>
      ),
    }),
    columnHelper.accessor("leverage", {
      header: "Max Leverage",
      meta: {
        sx: { width: "20%" },
      },
      cell: ({ getValue }) => <Text>{getValue()}x</Text>,
    }),
    columnHelper.display({
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <Button
            size="small"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation()
              navigate({
                to: "/borrow/multiply/$strategyId",
                params: { strategyId: row.original.id },
              })
            }}
          >
            Multiply
          </Button>
        </div>
      ),
      meta: {
        sx: {
          paddingRight: "20px",
        },
      },
    }),
  ]

  return (
    <Flex direction="column" gap={24}>
      {/* Featured Loops */}
      <div>
        <Text fs={18} fw={600} mb={16} font="primary">
          Featured Loops
        </Text>
        <Grid columns={gte("xl") ? 4 : gte("sm") ? 2 : 1} gap={16}>
          {strategies.slice(0, 4).map((s) => (
            <Link
              key={"feat-" + s.id}
              to={"/borrow/multiply/$strategyId" as any}
              params={{ strategyId: s.id } as any}
              style={{ textDecoration: "none" }}
            >
              <SLoopCard>
                <Flex justify="space-between" align="center">
                  <Flex>
                    {s.collateralAsset.symbol === "PRIME" ? (
                      <BaseAssetLogo src={primeLogo} size="large" alt="PRIME" />
                    ) : (
                      <AssetLogo id={s.collateralAsset.logoId} size="large" />
                    )}
                    <div style={{ marginLeft: -12 }}>
                      <AssetLogo id={s.debtAsset.logoId} size="large" />
                    </div>
                  </Flex>
                  <SBadge>Up to {s.leverage}x</SBadge>
                </Flex>
                <div style={{ marginTop: 8 }}>
                  <Text fs={18} fw={600}>
                    {s.collateralAsset.symbol} Loop
                  </Text>
                  <Text fs={13} color={theme.text.low}>
                    Borrow {s.debtAsset.symbol} to leverage{" "}
                    {s.collateralAsset.symbol}
                  </Text>
                </div>
                <Flex justify="space-between" align="flex-end" mt={12}>
                  <div>
                    <Text fs={11} color={theme.text.low} mb={2}>
                      Net APY
                    </Text>
                    <Text
                      fs={20}
                      fw={700}
                      color={theme.details.values.positive}
                      style={{ fontFamily: "Gazpacho" }}
                    >
                      {s.netApy.toFixed(2)}%
                    </Text>
                  </div>
                </Flex>
              </SLoopCard>
            </Link>
          ))}
        </Grid>
      </div>

      {/* Strategies List */}
      <Box>
        <Text fs={18} fw={600} mb={16} font="primary">
          All pairs
        </Text>
        <SSection>
          <DataTable
            data={strategies}
            columns={columns}
            onRowClick={(row) =>
              navigate({
                to: "/borrow/multiply/$strategyId" as any,
                params: { strategyId: row.id } as any,
              })
            }
          />
        </SSection>
      </Box>
    </Flex>
  )
}
