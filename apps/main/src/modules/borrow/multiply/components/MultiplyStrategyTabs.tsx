import { useSearch } from "@tanstack/react-router"
import { TabMenu } from "@/components/TabMenu/TabMenu"

export const MultiplyStrategyTabs = ({ strategyId }: { strategyId: string }) => {
    const search = useSearch({
        from: "/borrow/multiply/$strategyId",
    })

    return (
        <TabMenu
            items={[
                {
                    to: `/borrow/multiply/${strategyId}` as any,
                    search: { ...search, tab: "info" },
                    title: "Info",
                },
                {
                    to: `/borrow/multiply/${strategyId}` as any,
                    search: { ...search, tab: "simulation" },
                    title: "Simulation",
                },
            ]}
        />
    )
}
