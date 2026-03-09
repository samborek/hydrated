import { createFileRoute } from "@tanstack/react-router"

import { LimitOrder } from "@/modules/trade/swap/sections/LimitOrder/LimitOrder"

export const Route = createFileRoute("/trade/_history/swap/limit")({
  component: LimitOrder,
})
