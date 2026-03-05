import { createFileRoute, Outlet } from "@tanstack/react-router"

import { getPageMeta } from "@/config/navigation"

/**
 * Stats route - conditionally renders SubpageLayout for main stats pages
 * but bypasses it for asset detail pages (which have their own layout)
 */
const StatsLayoutComponent = () => {
  return <Outlet />
}

export const Route = createFileRoute("/stats")({
  component: StatsLayoutComponent,
  head: ({
    match: {
      context: { i18n },
    },
  }) => ({
    meta: getPageMeta("stats", i18n.t),
  }),
})
