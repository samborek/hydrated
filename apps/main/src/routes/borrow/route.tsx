import { createFileRoute, useMatch } from "@tanstack/react-router"

import { getPageMeta } from "@/config/navigation"
import { BorrowContextProvider } from "@/modules/borrow/BorrowContextProvider"
import { SubpageLayout } from "@/modules/layout/SubpageLayout"
import { useBorrowCrumbs } from "@/modules/borrow/Borrow.crumbs"
import { PositionsIndicator } from "@/modules/borrow/multiply/components/PositionsIndicator"

const Page = () => {
  const crumbs = useBorrowCrumbs()
  const isDashboardPage = useMatch({
    from: "/borrow/dashboard",
    shouldThrow: false,
  })
  const isMultiplyPage = useMatch({
    from: "/borrow/multiply/",
    shouldThrow: false,
  })
  const isMarketsPage = useMatch({
    from: "/borrow/markets/",
    shouldThrow: false,
  })
  const isHistoryPage = useMatch({
    from: "/borrow/history",
    shouldThrow: false,
  })

  const isListPage =
    isDashboardPage || isMultiplyPage || isMarketsPage || isHistoryPage

  return (
    <BorrowContextProvider>
      <SubpageLayout
        crumbs={!isListPage ? crumbs : undefined}
        subpageMenuHidden={!isListPage}
        actions={isListPage ? <PositionsIndicator /> : undefined}
      />
    </BorrowContextProvider>
  )
}

export const Route = createFileRoute("/borrow")({
  component: Page,
  head: ({
    match: {
      context: { i18n },
    },
  }) => ({
    meta: getPageMeta("borrow", i18n.t),
  }),
})

