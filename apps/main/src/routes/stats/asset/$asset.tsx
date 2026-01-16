import { createFileRoute } from "@tanstack/react-router"

import { AssetDetailPage } from "@/modules/stats/pages/AssetDetailPage"

export const Route = createFileRoute("/stats/asset/$asset")({
  component: AssetDetailPage,
})
