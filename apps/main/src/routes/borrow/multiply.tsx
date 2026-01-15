import { createFileRoute } from "@tanstack/react-router"

import { getPageMeta } from "@/config/navigation"
import { MultiplyView } from "@/modules/borrow/dashboard/MultiplyView"

export const Route = createFileRoute("/borrow/multiply")({
    component: MultiplyView,
    head: ({
        match: {
            context: { i18n },
        },
    }) => ({
        meta: getPageMeta("multiply", i18n.t),
    }),
})
