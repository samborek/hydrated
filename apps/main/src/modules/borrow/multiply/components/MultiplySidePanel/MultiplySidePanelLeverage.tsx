import { Box, Flex, Slider, Text } from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { getTokenPx } from "@galacticcouncil/ui/utils"
import { HelpCircle } from "lucide-react"
import { FC } from "react"

export type MultiplySidePanelLeverageProps = {
    value: number
    onChange: (val: number) => void
    min: number
    max: number
}

export const MultiplySidePanelLeverage: FC<MultiplySidePanelLeverageProps> = ({
    value,
    onChange,
    min,
    max,
}) => {
    const { themeProps: theme } = useTheme()

    return (
        <Box>
            <Flex
                justify="space-between"
                align="center"
                mb={getTokenPx("scales.paddings.m")}
            >
                <Text fs="p3" fw={500} color={theme.text.high}>
                    Leverage
                </Text>

                <Flex align="center" gap={getTokenPx("scales.paddings.s")}>
                    <Text fs="p3" fw={500} color={theme.text.medium}>
                        Current:{" "}
                        <span style={{ color: theme.text.high }}>{value.toFixed(1)}x</span>
                    </Text>
                    <HelpCircle size={14} color={theme.text.medium} />
                </Flex>
            </Flex>

            <Box sx={{ py: getTokenPx("scales.paddings.s") }}>
                <Slider
                    min={min}
                    max={max}
                    step={0.1}
                    value={value}
                    onChange={onChange}
                />
            </Box>

            <Flex justify="space-between" mt={getTokenPx("scales.paddings.xs")}>
                {[1.1, 2, 3, 4].map((mark) => (
                    <Text
                        key={mark}
                        fs="p6"
                        color={theme.text.low}
                        style={{ cursor: "pointer" }}
                        onClick={() => onChange(mark)}
                    >
                        {mark}x
                    </Text>
                ))}
            </Flex>
        </Box>
    )
}
