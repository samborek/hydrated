import { createFileRoute } from "@tanstack/react-router"
import * as z from "zod/v4"

import { getPageMeta } from "@/config/navigation"
import { SubpageLayout } from "@/modules/layout/SubpageLayout"

export const stakingTabs = ["staking", "gigastake"] as const
export type StakingTab = (typeof stakingTabs)[number]

const searchSchema = z.object({
  tab: z.enum(stakingTabs).optional(),
})

export type StakingSearchParams = z.infer<typeof searchSchema>

export const Route = createFileRoute("/staking")({
  component: SubpageLayout,
  validateSearch: searchSchema,
  head: ({
    match: {
      context: { i18n },
    },
  }) => ({
    meta: getPageMeta("staking", i18n.t),
  }),
})
