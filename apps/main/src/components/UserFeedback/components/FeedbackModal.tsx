import {
    Modal,
    ModalBody,
    ModalHeader,
} from "@galacticcouncil/ui/components"
import { type ComponentProps, FC } from "react"
import { useTranslation } from "react-i18next"
import { FeedbackForm } from "./FeedbackForm"

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export const FeedbackModal: FC<Props> = ({ open, onOpenChange }) => {
    const { t } = useTranslation()

    return (
        <Modal
            open={open}
            onOpenChange={onOpenChange}
            {...({ contentFit: "hug" } as ComponentProps<typeof Modal>)}
        >
            <ModalHeader title={(t as any)("common:feedback.modal.title")} />
            <ModalBody scrollable={false}>
                <FeedbackForm onClose={() => onOpenChange(false)} />
            </ModalBody>
        </Modal>
    )
}
