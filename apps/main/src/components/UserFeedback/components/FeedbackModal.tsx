import {
    Modal,
    ModalBody,
    ModalHeader,
} from "@galacticcouncil/ui/components"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { FeedbackForm } from "./FeedbackForm"

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export const FeedbackModal: FC<Props> = ({ open, onOpenChange }) => {
    const { t } = useTranslation()

    return (
        <Modal open={open} onOpenChange={onOpenChange}>
            <ModalHeader title={(t as any)("common:feedback.modal.title")} />
            <ModalBody>
                <FeedbackForm onClose={() => onOpenChange(false)} />
            </ModalBody>
        </Modal>
    )
}
