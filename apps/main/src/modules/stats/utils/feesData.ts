export type TimeRange = '1W' | '1M' | '3M' | '1Y' | 'ALL'

export type FeesDataPoint = {
  date: string
  networkFees: number
  tradingFees: number
  liquidityFees: number
  supplyBorrowFees: number
  hollarFees: number
  rateTrading: number
  rateNetwork: number
  rateLiquidity: number
  rateSupplyBorrow: number
  rateHollar: number
}

export type FeeDestinationBreakdown = {
  treasury: number
  lps: number
  burned: number
  stakers: number
  users: number
}

const feesDataCache: Partial<Record<TimeRange, FeesDataPoint[]>> = {}

const createFeesData = (timeRange: TimeRange): FeesDataPoint[] => {
  const data: FeesDataPoint[] = []
  const now = new Date()

  const isWeekly = timeRange === '1Y' || timeRange === 'ALL'
  const days =
    timeRange === '1W' ? 7 :
      timeRange === '1M' ? 30 :
        timeRange === '3M' ? 90 :
          timeRange === '1Y' ? 52 :
            104
  const step = isWeekly ? 7 : 1

  let lastAssetFee = 2.5
  let lastProtocolFee = 0.15
  let lastWithdrawalFee = 0.5

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - (i * step))

    const multiplier = isWeekly ? 7 : 1
    const volatility = () => 0.7 + Math.random() * 0.6

    lastAssetFee = Math.max(0.15, Math.min(5.0, lastAssetFee + (Math.random() - 0.5) * 0.5))
    lastProtocolFee = Math.max(0.05, Math.min(0.25, lastProtocolFee + (Math.random() - 0.5) * 0.05))
    lastWithdrawalFee = Math.max(0.01, Math.min(1.0, lastWithdrawalFee + (Math.random() - 0.5) * 0.1))

    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      networkFees: (Math.random() * 50 + 20) * multiplier * volatility(),
      tradingFees: (Math.random() * 4000 + 2000) * multiplier * volatility(),
      liquidityFees: (Math.random() * 200 + 50) * multiplier * volatility(),
      supplyBorrowFees: (Math.random() * 800 + 400) * multiplier * volatility(),
      hollarFees: (Math.random() * 600 + 300) * multiplier * volatility(),
      rateTrading: lastAssetFee,
      rateNetwork: lastProtocolFee,
      rateLiquidity: lastWithdrawalFee,
      rateSupplyBorrow: 8.0 + volatility(),
      rateHollar: 12.0 + volatility(),
    })
  }

  return data
}

export const generateFeesData = (timeRange: TimeRange): FeesDataPoint[] => {
  if (!feesDataCache[timeRange]) {
    feesDataCache[timeRange] = createFeesData(timeRange)
  }

  return feesDataCache[timeRange] ?? []
}

export const getFeeDestinationBreakdown = (
  day: Pick<FeesDataPoint, 'networkFees' | 'tradingFees' | 'liquidityFees' | 'supplyBorrowFees' | 'hollarFees'>,
): FeeDestinationBreakdown => ({
  treasury: day.networkFees + day.hollarFees + day.supplyBorrowFees * 0.5,
  lps: day.liquidityFees + day.tradingFees * 0.5,
  burned: day.supplyBorrowFees * 0.5,
  stakers: day.tradingFees * 0.35,
  users: day.tradingFees * 0.15,
})
