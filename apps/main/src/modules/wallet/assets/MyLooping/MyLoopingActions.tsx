import { Plus } from "@galacticcouncil/ui/assets/icons"
import { Button } from "@galacticcouncil/ui/components"
import { useNavigate } from "@tanstack/react-router"
import { FC } from "react"
import { useTranslation } from "react-i18next"

export const MyLoopingActions: FC = () => {
    const { t } = useTranslation(["wallet", "common"])
    const navigate = useNavigate()

    return (
        <Button onClick={() => navigate({ to: "/borrow/multiply" })}>
            <Plus />
            {t("myLooping.header.cta", "Open looping")}
        </Button>
    )
}
