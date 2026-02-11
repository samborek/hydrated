import {
    FormField,
    Input,
    Select,
} from "@galacticcouncil/ui/components"
import { FC, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import styled from "@emotion/styled"
import { css, keyframes } from "@emotion/react"
import { toast } from "sonner"

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
`

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

const SFormLayout = styled.div(
  () => css`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    height: 100%;
    /* With modal contentFit="hug", form sizes to content (no fixed height) */
  `,
)

const SFormScrollContent = styled.div(
  ({ theme }) => css`
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: ${theme.space.xl};
    padding-bottom: ${theme.space.xl};
  `,
)

const SSubmitFooter = styled.footer(
  ({ theme }) => css`
    flex-shrink: 0;
    /* Break out of modal body padding so top border spans 100% of modal width */
    margin-inline: var(--modal-content-inset, 0);
    padding: ${theme.space.xl};
    padding-inline: calc(var(--modal-content-padding, ${theme.space.xl}) + ${theme.space.xl});
    padding-bottom: env(safe-area-inset-bottom, ${theme.space.xl});
    border-top: 1px solid ${theme.details?.separators ?? "transparent"};
    background: ${theme.surfaces?.themeBasePalette?.surfaceHigh ??
      theme.surfaces?.themeBasePalette?.background ??
      "inherit"};
  `,
)

const SSubmitButton = styled.button(
  ({ theme }) => css`
    /* Match primary large button from design system */
    position: relative;
    display: grid;
    grid-auto-flow: column;
    column-gap: ${theme.space.base};
    align-items: center;
    place-content: center;
    width: 100%;
    line-height: 1;
    height: 3.125rem;
    font-size: ${theme.fontSizes.p3};
    font-family: ${theme.fontFamilies1.secondary};
    font-weight: 500;
    padding: ${theme.buttons.paddings.primary} ${theme.space.xl};
    border: none;
    border-radius: ${theme.radii.full};
    cursor: pointer;
    transition: ${theme.transitions.colors}, ${theme.transitions.opacity};
    background-color: ${theme.buttons.primary.high.rest};
    color: ${theme.buttons.primary.high.onButton};

    &:hover:not(:disabled) {
      background-color: ${theme.buttons.primary.high.hover};
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
      /* Let clicks pass through to wrapper so shake animation can trigger */
      pointer-events: none;
    }
  `,
)

const SHAKE_DURATION_MS = 280

const SSubmitButtonWrap = styled.div<{ $shake: boolean; $disabled?: boolean }>(
  ({ $shake, $disabled }) => css`
    position: relative;
    ${$disabled && "cursor: not-allowed;"}

    ${$shake &&
    css`
      animation: ${shake} ${SHAKE_DURATION_MS}ms ease-in-out;
    `}
  `,
)

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
    const [shakeTrigger, setShakeTrigger] = useState(0)

    const hasContent =
        subject.trim().length > 0 && description.trim().length > 0

    const handleDisabledClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        setShakeTrigger((n) => n + 1)
    }, [])

    const categories = [
        { key: "bug", label: t("feedback.categories.bug") },
        { key: "feature", label: t("feedback.categories.feature") },
        {
            key: "question",
            label: t("feedback.categories.question"),
        },
        { key: "other", label: t("feedback.categories.other") },
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
        toast.success(t("feedback.success"))
        onClose()
    }

    return (
        <SFormLayout>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    minHeight: 0,
                }}
            >
                <SFormScrollContent>
                <FormField label={t("feedback.form.category")}>
                    <SSelectContainer>
                        <Select
                            value={category}
                            items={categories}
                            onValueChange={setCategory}
                        />
                    </SSelectContainer>
                </FormField>

                <FormField label={t("feedback.form.subject")}>
                    <Input
                        placeholder={t("feedback.form.subjectPlaceholder")}
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                </FormField>

                <FormField label={t("feedback.form.description")}>
                    <STextArea
                        placeholder={t("feedback.form.descriptionPlaceholder")}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </FormField>

                <FormField label={t("feedback.form.file")}>
                    <SFileUploadLabel>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            {previewUrl && (
                                <SImagePreview src={previewUrl} alt="Preview" />
                            )}
                            <span>
                                {file
                                    ? file.name
                                    : t("feedback.form.filePlaceholder")}
                            </span>
                        </div>
                        <input
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                    </SFileUploadLabel>
                </FormField>
            </SFormScrollContent>

            <SSubmitFooter>
                <SSubmitButtonWrap
                    $shake={shakeTrigger > 0}
                    $disabled={!hasContent}
                    key={shakeTrigger}
                    onClick={!hasContent ? handleDisabledClick : undefined}
                >
                    <SSubmitButton
                        type="submit"
                        disabled={!hasContent}
                    >
                        {t("feedback.form.submit")}
                    </SSubmitButton>
                </SSubmitButtonWrap>
            </SSubmitFooter>
            </form>
        </SFormLayout>
    )
}
