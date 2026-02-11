import { Button, Icon, Text } from "@galacticcouncil/ui/components"
import { MessageSquare } from "@galacticcouncil/ui/assets/icons"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { SContainer } from "./UserFeedback.styled"
import { FeedbackModal } from "./components/FeedbackModal"

type Props = {
    readonly bottomPinned?: boolean
}

export const UserFeedback: FC<Props> = ({ bottomPinned }) => {
    const { t } = useTranslation()
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <SContainer bottomPinned={bottomPinned}>
            <Button
                variant="tertiary"
                size="small"
                outline
                onClick={() => setModalOpen(true)}
            >
                <Icon component={MessageSquare} size="s" />
                <Text fs="p6" fw={500}>{t("common:feedback.pill")}</Text>
            </Button>
            <FeedbackModal open={modalOpen} onOpenChange={setModalOpen} />
        </SContainer>
    )
}
