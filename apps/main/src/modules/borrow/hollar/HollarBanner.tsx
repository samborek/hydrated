import { getGhoReserve } from "@galacticcouncil/money-market/utils"
import { useBreakpoints } from "@galacticcouncil/ui/theme"
import { FC, lazy, useCallback, useState } from "react"

import { useBorrowReserves } from "@/api/borrow"

const BANNER_DISMISSED_KEY = "hollar-banner-dismissed"

const HollarBannerMobile = lazy(async () => ({
  default: await import("@/modules/borrow/hollar/HollarBanner.mobile").then(
    (m) => m.HollarBannerMobile,
  ),
}))

const HollarBannerDesktop = lazy(async () => ({
  default: await import("@/modules/borrow/hollar/HollarBanner.desktop").then(
    (m) => m.HollarBannerDesktop,
  ),
}))

export const HollarBanner: FC = () => {
  const { gte } = useBreakpoints()

  const [isDismissed, setIsDismissed] = useState(() => {
    if (typeof window === "undefined") return false
    return localStorage.getItem(BANNER_DISMISSED_KEY) === "true"
  })

  const { data: reserves, isLoading: isLoadingReserves } = useBorrowReserves()

  const reserve = reserves?.formattedReserves
    ? getGhoReserve(reserves.formattedReserves)
    : null

  const handleDismiss = useCallback(() => {
    setIsDismissed(true)
    localStorage.setItem(BANNER_DISMISSED_KEY, "true")
  }, [])

  if (isDismissed) {
    return null
  }

  if (gte("md")) {
    return (
      <HollarBannerDesktop
        reserve={reserve}
        isLoadingReserves={isLoadingReserves}
        onDismiss={handleDismiss}
      />
    )
  }

  return <HollarBannerMobile reserve={reserve} onDismiss={handleDismiss} />
}
