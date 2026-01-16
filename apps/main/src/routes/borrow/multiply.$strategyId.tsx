import { createFileRoute } from "@tanstack/react-router"

import { MultiplyDetailPage } from "@/modules/borrow/multiply/MultiplyDetailPage"

export const Route = createFileRoute("/borrow/multiply/$strategyId")({
  component: () => {
    const { strategyId } = Route.useParams()
    return <MultiplyDetailPage strategyId={strategyId} />
  },
})
