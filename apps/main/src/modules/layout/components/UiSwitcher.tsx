import { Select } from "@galacticcouncil/ui/components"
import { FC } from "react"
import { useUiContext } from "@/providers/uiProvider"

const UI_OPTIONS = [
    { key: "current", label: "Current UI" },
    { key: "old", label: "Old UI" },
]

export const UiSwitcher: FC = () => {
    const { uiVersion, setUiVersion } = useUiContext()

    return (
        <Select
            value={uiVersion}
            onValueChange={(value) => setUiVersion(value as "current" | "old")} // Cast to expected type
            items={UI_OPTIONS}
            placeholder="Select UI"
        />
    )
}
