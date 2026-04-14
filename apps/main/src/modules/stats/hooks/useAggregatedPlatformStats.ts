import { calculateTotalTVL, useOmnipoolTVL, useXYKPools } from "@/api/stats"
import { useAssetPrice } from "@/states/displayAsset"
import { useBorrowReserves } from "@/api/borrow"
import { useStakingAPR, useStakingSupply } from "@/modules/staking/DashboardStats.data"
import { getGhoReserve } from "@galacticcouncil/money-market/utils"
import { useMemo } from "react"
import { NATIVE_ASSET_ID } from "@/utils/consts"

export const useAggregatedPlatformStats = () => {
  // TVL sources
  const { data: omnipoolData, isLoading: isOmniLoading } = useOmnipoolTVL(1000)
  const { data: xykData, isLoading: isXykLoading } = useXYKPools(50)
  const { data: borrowReserves, isLoading: isReservesLoading } = useBorrowReserves()

  // Volume sources - mocked temporarily per plan
  const mockVolume = 10300000 // $10.3M mock
  
  // Fees / Revenue - Mocked
  const isFeesLoading = false

  // HDX Price
  const { price: hdxSpotPrice, isLoading: isPriceLoading } = useAssetPrice(NATIVE_ASSET_ID)

  // STAKING
  const { stakingAPR, isLoading: isStakingAPRLoading } = useStakingAPR(0n)
  
  const isLoading = isOmniLoading || isXykLoading || isReservesLoading || isFeesLoading || isPriceLoading || isStakingAPRLoading

  const stats = useMemo(() => {
    // 1. Calculate TVL
    let omnipoolTvl = 0
    if (omnipoolData) {
      omnipoolTvl = calculateTotalTVL(omnipoolData)
    }
    
    let xykTvl = 0
    if (xykData) {
      xykTvl = xykData.reduce((acc, pool) => acc + parseFloat(pool.tvlInRefAssetNorm || "0"), 0)
    }

    let borrowTvl = 0
    if (borrowReserves?.formattedReserves) {
      borrowTvl = borrowReserves.formattedReserves.reduce((acc, r) => acc + parseFloat(r.totalLiquidityUSD), 0)
    }
    
    // Trading / AMM TVL
    const tradingTvl = omnipoolTvl + xykTvl
    const totalTvl = tradingTvl + borrowTvl

    // 2. 24h Volume
    const totalVolume = mockVolume

    // 3. Capital Efficiency
    const capitalEfficiency = totalTvl > 0 ? (totalVolume / totalTvl) * 100 : 0

    // 4. Protocol Revenue (24h)
    const protocolRevenue = 45200 // $45.2K mock

    // 5. HDX Price & 24h change
    const hdxPriceValue = hdxSpotPrice ? parseFloat(hdxSpotPrice) : 0
    const mockHdxChange = 5.2 // +5.2% mock

    // 6. Hollar Supply & Peg
    let hollarSupply = 0
    let hollarPeg = 1.0
    if (borrowReserves?.formattedReserves) {
      const ghoReserve = getGhoReserve(borrowReserves.formattedReserves)
      if (ghoReserve) {
        hollarSupply = parseFloat(ghoReserve.totalDebtUSD)
        hollarPeg = parseFloat(ghoReserve.priceInUSD)
      }
    }
    hollarSupply += 500000; // Adding mock HSM

    // Money Market metrics
    let borrowUtilization = 0
    if (borrowTvl > 0) {
      const totalDebt = borrowReserves?.formattedReserves.reduce((acc, r) => acc + parseFloat(r.totalDebtUSD), 0) || 0
      borrowUtilization = (totalDebt / borrowTvl) * 100
    }

    // 7. Staking
    const stakingApyStr = stakingAPR ? `${stakingAPR.toFixed(2)}%` : "N/A"

    return {
      totalTvl,
      borrowTvl,
      borrowUtilization,
      tradingTvl,
      totalVolume,
      capitalEfficiency,
      protocolRevenue,
      hdxPrice: hdxPriceValue,
      hdxChange: mockHdxChange,
      hollarSupply,
      hollarPeg,
      stakingApyStr
    }
  }, [
    omnipoolData,
    xykData,
    borrowReserves,
    hdxSpotPrice,
    stakingAPR
  ])

  // Need useStakingSupply here, but wait, it's a separate hook:
  const { supplyStaked } = useStakingSupply()

  return { stats: { ...stats, supplyStaked }, isLoading }
}
