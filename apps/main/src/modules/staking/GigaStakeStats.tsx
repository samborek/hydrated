import { Flex, Text, Paper, Tooltip, Skeleton, Separator } from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { getToken } from "@galacticcouncil/ui/utils"
import { FC } from "react"
import { useTranslation } from "react-i18next"

export const GigaStakeStats: FC = () => {
    const { t } = useTranslation(["common", "staking"])
    const { themeProps } = useTheme()

    // TODO: Actual data hooks
    const isLoading = false

    return (
        <Paper px="m" py="m">
            <Flex direction="column" gap="m">
                <Flex gap="base" align="center" justify="space-between">
                    <Flex direction="column" gap="xs">
                        <Flex gap="s" align="center">
                            <Text fw={500} fs="p5" lh={1.2} color={getToken("text.medium")}>
                                Projected APR
                            </Text>
                        </Flex>
                        {isLoading ? (
                            <Skeleton height={18} />
                        ) : (
                            <Text font="primary" fw={500} fs="h7" lh={1} color={themeProps.colors.positive}>
                                22.5%
                            </Text>
                        )}
                    </Flex>

                    <Separator orientation="vertical" />

                    <Flex direction="column" gap="xs">
                        <Flex gap="s" align="center">
                            <Text fw={500} fs="p5" lh={1.2} color={getToken("text.medium")}>
                                Lockdown Period
                            </Text>
                        </Flex>
                        {isLoading ? (
                            <Skeleton height={18} />
                        ) : (
                            <Text font="primary" fw={500} fs="h7" lh={1} color={getToken("text.high")}>
                                ~222 Days
                            </Text>
                        )}
                    </Flex>

                    <Separator orientation="vertical" />

                    <Flex direction="column" gap="xs">
                        <Flex gap="s" align="center">
                            <Text fw={500} fs="p5" lh={1.2} color={getToken("text.medium")}>
                                Borrowing Term
                            </Text>
                        </Flex>
                        {isLoading ? (
                            <Skeleton height={18} />
                        ) : (
                            <Text font="primary" fw={500} fs="h7" lh={1} color={getToken("text.high")}>
                                <span style={{ color: themeProps.colors.positive }}>Available</span>
                            </Text>
                        )}
                    </Flex>
                </Flex>
            </Flex>
        </Paper>
    )
}
