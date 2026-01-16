
import styled from "@emotion/styled"
import { Button } from "@/components/Button"
import { FC } from "react"

// Gap from Figma: buttons/paddings/quart = 4px
const SContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`

export type TimeRangeToggleProps = {
    value: string
    items: string[]
    onValueChange: (value: string) => void
    disabled?: boolean
    className?: string
}

export const TimeRangeToggle: FC<TimeRangeToggleProps> = ({ value, items, onValueChange, disabled, className }) => {
    return (
        <SContainer className={className}>
            {items.map((item) => (
                <Button
                    key={item}
                    size="small"
                    variant={value === item ? 'secondary' : 'restSubtle'}
                    outline={value !== item}
                    onClick={() => !disabled && onValueChange(item)}
                    disabled={disabled}
                    sx={{
                        // Figma specs:
                        height: 30,
                        minWidth: 30,
                        px: '8px', // --containers/paddings/quart
                        fontSize: 11, // --paragraphsize/p4
                        borderRadius: 32, // Rounded pill
                        fontWeight: 500, // Medium
                        textTransform: 'none', // Ensure case is preserved if needed
                    }}
                >
                    {item}
                </Button>
            ))}
        </SContainer>
    )
}
