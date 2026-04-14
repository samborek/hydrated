import { createFileRoute, redirect } from "@tanstack/react-router"

import { LINKS } from "@/config/navigation"

export const Route = createFileRoute("/stats/")({
  beforeLoad: () => {
    throw redirect({ to: LINKS.statsOverview, replace: true })
  },
})
