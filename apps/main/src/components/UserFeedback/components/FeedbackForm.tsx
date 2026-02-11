import {
    Button,
    FormField,
    Input,
    Select,
} from "@galacticcouncil/ui/components"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import { toast } from "sonner"

const STextArea = styled.textarea(
    ({ theme }) => css`
    background-color: ${theme.buttons.outlineDark.rest};
    border: 1px solid ${theme.buttons.outlineDark.rest};
    border-radius: 12px;
    padding: 12px;
    color: ${theme.text.high};
    font-size: ${theme.fontSizes.p5};
    font-family: inherit;
    resize: vertical;
    min-height: 100px;
    width: 100%;

    &:focus {
      outline: none;
      background-color: ${theme.buttons.outlineDark.hover};
      border-color: ${theme.buttons.secondary.outline.outline};
    }

    &::placeholder {
      color: ${theme.text.medium};
    }
  `,
)

const SFileUploadLabel = styled.label(
    ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    border: 1px dashed ${theme.details.borders};
    border-radius: 12px;
    cursor: pointer;
    color: ${theme.text.medium};
    transition: all 0.3s ease-in-out;

    &:hover {
      background: ${theme.buttons.secondary.low.hover};
      color: ${theme.text.high};
    }
  `,
)

const SImagePreview = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 12px;
`

const SSelectContainer = styled.div`
  width: 100%;
  & > button {
    width: 100% !important;
    justify-content: space-between !important;
    padding-left: 12px !important;
    padding-right: 12px !important;
  }
`

type Props = {
    onClose: () => void
}

export const FeedbackForm: FC<Props> = ({ onClose }) => {
    const { t } = useTranslation()
    const [category, setCategory] = useState<string>("bug")
    const [subject, setSubject] = useState("")
    const [description, setDescription] = useState("")
    const [file, setFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const categories = [
        { key: "bug", label: (t as any)("common:feedback.categories.bug") },
        { key: "feature", label: (t as any)("common:feedback.categories.feature") },
        {
            key: "question",
            label: (t as any)("common:feedback.categories.question"),
        },
        { key: "other", label: (t as any)("common:feedback.categories.other") },
    ]

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        setFile(selectedFile || null)

        if (selectedFile && selectedFile.type.startsWith("image/")) {
            const url = URL.createObjectURL(selectedFile)
            setPreviewUrl(url)
        } else {
            setPreviewUrl(null)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Mock submission
        console.log("Feedback Submitted:", {
            category,
            subject,
            description,
            file,
        })
        toast.success((t as any)("common:feedback.success"))
        onClose()
    }

    return (
        <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
            <FormField label={(t as any)("common:feedback.form.category")}>
                <SSelectContainer>
                    <Select
                        value={category}
                        items={categories}
                        onValueChange={setCategory}
                    />
                </SSelectContainer>
            </FormField>

            <FormField label={(t as any)("common:feedback.form.subject")}>
                <Input
                    placeholder={(t as any)("common:feedback.form.subjectPlaceholder")}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                />
            </FormField>

            <FormField label={(t as any)("common:feedback.form.description")}>
                <STextArea
                    placeholder={(t as any)("common:feedback.form.descriptionPlaceholder")}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </FormField>

            <FormField label={(t as any)("common:feedback.form.file")}>
                <SFileUploadLabel>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {previewUrl && <SImagePreview src={previewUrl} alt="Preview" />}
                        <span>
                            {file ? file.name : (t as any)("common:feedback.form.filePlaceholder")}
                        </span>
                    </div>
                    <input
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                </SFileUploadLabel>
            </FormField>

            <Button variant="primary" size="large" type="submit">
                {(t as any)("common:feedback.form.submit")}
            </Button>
        </form>
    )
}
