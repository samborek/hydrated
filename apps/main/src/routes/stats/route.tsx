import { createFileRoute } from "@tanstack/react-router"

import { getPageMeta } from "@/config/navigation"
import { SubpageLayout } from "@/modules/layout/SubpageLayout"

export const Route = createFileRoute("/stats")({
    component: () => <SubpageLayout />,
    head: ({
        match: {
            context: { i18n },
        },
    }) => ({
        meta: getPageMeta("stats", i18n.t),
    }),
})
