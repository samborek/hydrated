import { Button, Icon, Text } from "@galacticcouncil/ui/components"
import { MessageSquare } from "@galacticcouncil/ui/assets/icons"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import Userback from "@userback/widget"
import { SContainer } from "./UserFeedback.styled"

type Props = {}

export const UserFeedback: FC<Props> = () => {
    const { t } = useTranslation()

    return (
        <SContainer>
            <Button
                variant="tertiary"
                size="small"
                outline
                onClick={async () => {
                    const ub = await Userback("A-afTDRIvoQaVlOLXCoXTYpKixk")
                    ub.open()
                }}
            >
                <Icon component={MessageSquare} size="s" />
                <Text fs="p6" fw={500}>{(t as any)("common:feedback.pill")}</Text>
            </Button>
        </SContainer>
    )
}
