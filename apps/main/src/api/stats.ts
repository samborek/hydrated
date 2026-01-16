/**
 * Stats API - GraphQL queries for Stats dashboard data
 *
 * Uses the orca-prod squid for stats-specific metrics (TVL, Volume, Fees)
 * API: https://galacticcouncil.squids.live/hydration-pools:orca-prod/api/graphql
 */

import { queryOptions, useQuery } from "@tanstack/react-query"

import { GC_TIME, STALE_TIME } from "@/utils/consts"

// Stats-specific squid endpoint (different from main unified-prod squid)
const STATS_SQUID_URL =
  "https://galacticcouncil.squids.live/hydration-pools:orca-prod/api/graphql"

// Types
export type OmnipoolAssetTVL = {
  assetId: string
  tvlInRefAssetNorm: string | null
  freeBalance: string
  paraBlockHeight: number
}

export type AssetVolume = {
  assetId: string
  volumeIn: string
  volumeOut: string
  volumeInNorm: string | null
  volumeOutNorm: string | null
  totalVolumeIn: string
  totalVolumeOut: string
  paraBlockHeight: number
}

export type AssetSwapFee = {
  assetId: string
  amount: string
  totalAmount: string
  paraBlockHeight: number
}

export type XYKPool = {
  id: string
  assetAId: string
  assetBId: string
  assetABalance: string
  assetBBalance: string
  tvlInRefAssetNorm: string | null
}

// GraphQL fetch helper
const fetchStatsGraphQL = async <T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> => {
  const response = await fetch(STATS_SQUID_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  })

  if (!response.ok) {
    throw new Error(`Stats API error: ${response.statusText}`)
  }

  const { data, errors } = await response.json()

  if (errors?.length) {
    throw new Error(`GraphQL error: ${errors[0].message}`)
  }

  return data
}

// ============ TVL Data ============

const OMNIPOOL_TVL_QUERY = `
  query OmnipoolTVL($first: Int!) {
    omnipoolAssetHistoricalData(first: $first, orderBy: PARA_BLOCK_HEIGHT_DESC) {
      nodes {
        assetId
        tvlInRefAssetNorm
        freeBalance
        paraBlockHeight
      }
    }
  }
`

const fetchOmnipoolTVL = async (limit = 100): Promise<OmnipoolAssetTVL[]> => {
  const data = await fetchStatsGraphQL<{
    omnipoolAssetHistoricalData: { nodes: OmnipoolAssetTVL[] }
  }>(OMNIPOOL_TVL_QUERY, { first: limit })

  return data.omnipoolAssetHistoricalData.nodes
}

export const omnipoolTVLQuery = (limit = 100) =>
  queryOptions({
    queryKey: ["stats", "omnipoolTVL", limit],
    queryFn: () => fetchOmnipoolTVL(limit),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  })

export const useOmnipoolTVL = (limit = 100) => {
  return useQuery(omnipoolTVLQuery(limit))
}

// ============ Volume Data ============

const ASSET_VOLUME_QUERY = `
  query AssetVolume($first: Int!) {
    assetVolumeHistoricalData(first: $first, orderBy: PARA_BLOCK_HEIGHT_DESC) {
      nodes {
        assetId
        volumeIn
        volumeOut
        volumeInNorm
        volumeOutNorm
        totalVolumeIn
        totalVolumeOut
        paraBlockHeight
      }
    }
  }
`

const fetchAssetVolume = async (limit = 100): Promise<AssetVolume[]> => {
  const data = await fetchStatsGraphQL<{
    assetVolumeHistoricalData: { nodes: AssetVolume[] }
  }>(ASSET_VOLUME_QUERY, { first: limit })

  return data.assetVolumeHistoricalData.nodes
}

export const assetVolumeQuery = (limit = 100) =>
  queryOptions({
    queryKey: ["stats", "assetVolume", limit],
    queryFn: () => fetchAssetVolume(limit),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  })

export const useAssetVolume = (limit = 100) => {
  return useQuery(assetVolumeQuery(limit))
}

// ============ Swap Fee Data ============

const ASSET_SWAP_FEE_QUERY = `
  query AssetSwapFee($first: Int!) {
    assetSwapFeeHistoricalData(first: $first, orderBy: PARA_BLOCK_HEIGHT_DESC) {
      nodes {
        assetId
        amount
        totalAmount
        paraBlockHeight
      }
    }
  }
`

const fetchAssetSwapFees = async (limit = 100): Promise<AssetSwapFee[]> => {
  const data = await fetchStatsGraphQL<{
    assetSwapFeeHistoricalData: { nodes: AssetSwapFee[] }
  }>(ASSET_SWAP_FEE_QUERY, { first: limit })

  return data.assetSwapFeeHistoricalData.nodes
}

export const assetSwapFeeQuery = (limit = 100) =>
  queryOptions({
    queryKey: ["stats", "assetSwapFees", limit],
    queryFn: () => fetchAssetSwapFees(limit),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  })

export const useAssetSwapFees = (limit = 100) => {
  return useQuery(assetSwapFeeQuery(limit))
}

// ============ XYK Pools ============

const XYK_POOLS_QUERY = `
  query XYKPools($first: Int!) {
    xykpools(first: $first) {
      nodes {
        id
        assetAId
        assetBId
        assetABalance
        assetBBalance
        tvlInRefAssetNorm
      }
    }
  }
`

const fetchXYKPools = async (limit = 50): Promise<XYKPool[]> => {
  const data = await fetchStatsGraphQL<{
    xykpools: { nodes: XYKPool[] }
  }>(XYK_POOLS_QUERY, { first: limit })

  return data.xykpools.nodes
}

export const xykPoolsQuery = (limit = 50) =>
  queryOptions({
    queryKey: ["stats", "xykPools", limit],
    queryFn: () => fetchXYKPools(limit),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  })

export const useXYKPools = (limit = 50) => {
  return useQuery(xykPoolsQuery(limit))
}

// ============ Utility Functions ============

/**
 * Calculate total TVL from Omnipool assets
 */
export const calculateTotalTVL = (assets: OmnipoolAssetTVL[]): number => {
  // Get unique latest entries per asset
  const latestByAsset = new Map<string, OmnipoolAssetTVL>()

  for (const asset of assets) {
    const existing = latestByAsset.get(asset.assetId)
    if (!existing || asset.paraBlockHeight > existing.paraBlockHeight) {
      latestByAsset.set(asset.assetId, asset)
    }
  }

  return Array.from(latestByAsset.values()).reduce((sum, asset) => {
    const tvl = parseFloat(asset.tvlInRefAssetNorm || "0")
    return sum + tvl
  }, 0)
}

/**
 * Format large numbers for display (e.g., 1234567 -> "$1.23M")
 */
export const formatUSD = (value: number): string => {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(2)}K`
  }
  return `$${value.toFixed(2)}`
}
