import { useMatches } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import { BreadcrumbItem } from "@/components/Breadcrumb"

export const useBorrowCrumbs = (): BreadcrumbItem[] => {
    const { t } = useTranslation(["common", "borrow"])

    const paths = useMatches({
        select: (matches) =>
            matches.map((match) => ({
                fullPath: match.fullPath,
                params: match.params,
            })),
    })

    const crumbs = paths
        .filter(({ fullPath }) => fullPath.includes("borrow"))
        .map(({ fullPath, params }) => {
            if (fullPath === "/borrow/multiply/$strategyId") {
                let label = "Strategy"
                if (params && "strategyId" in params) {
                    const { strategyId } = params as { strategyId: string }
                    const [collateral, debt] = strategyId.split("-")
                    if (collateral && debt) {
                        label = `${collateral} / ${debt}`
                    }
                }
                return {
                    label,
                    path: fullPath,
                }
            } else {
                return {
                    label: getBreadcrumbLabel(fullPath, t),
                    path: fullPath,
                }
            }
        })

    return crumbs
}

const getBreadcrumbLabel = (path: string, t: any): string => {
    switch (path) {
        case "/borrow":
            return t("borrow:borrow")
        case "/borrow/dashboard":
            return t("borrow:navigation.borrowDashboard.title")
        case "/borrow/multiply":
            return "Multiply"
        case "/borrow/markets":
            return t("borrow:navigation.borrowMarkets.title")
        case "/borrow/history":
            return t("borrow:navigation.borrowHistory.title")
        default:
            return "N/A"
    }
}
