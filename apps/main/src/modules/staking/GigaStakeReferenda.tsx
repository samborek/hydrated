import { ChevronDown, ChevronUp } from "@galacticcouncil/ui/assets/icons"
import {
    Box,
    CollapsibleContent,
    CollapsibleRoot,
    CollapsibleTrigger,
    Flex,
    Icon,
    MicroButton,
    SectionHeader,
    Text,
} from "@galacticcouncil/ui/components"
import { useBreakpoints } from "@galacticcouncil/ui/theme"
import { getToken } from "@galacticcouncil/ui/utils"
import { FC, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

import { OngoingReferendaEmptyState } from "@/modules/staking/OngoingReferendaEmptyState"

export const GigaStakeReferenda: FC = () => {
    const { t } = useTranslation(["common", "staking"])
    const { isMobile } = useBreakpoints()

    const [isCollapsed, setIsCollapsed] = useState(isMobile)
    const gridRef = useRef<HTMLDivElement>(null)

    // Empty for now to mock the UI
    const referenda: any[] = []
    const isLoading = false

    return (
        <CollapsibleRoot open={!isCollapsed}>
            <Flex direction="column" gap="m">
                <Box>
                    <Flex
                        align={isMobile ? "center" : "flex-end"}
                        pt={[null, null, "xl"]}
                        justify="space-between"
                    >
                        <SectionHeader
                            title={t("staking:referenda.title", {
                                count: referenda.length,
                            })}
                            hasDescription
                            noTopPadding
                        />
                        {!isLoading && referenda.length > 0 && (
                            <MicroButton
                                asChild
                                sx={{ display: "flex", alignItems: "center", gap: "s" }}
                            >
                                <CollapsibleTrigger
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => setIsCollapsed((prev) => !prev)}
                                >
                                    <Text
                                        fw={500}
                                        fs="p6"
                                        lh={1.4}
                                        color={getToken("text.medium")}
                                        transform="uppercase"
                                    >
                                        {isCollapsed ? t("show") : t("hide")}
                                    </Text>
                                    <Icon
                                        size="xs"
                                        component={isCollapsed ? ChevronDown : ChevronUp}
                                        color={getToken("icons.onContainer")}
                                    />
                                </CollapsibleTrigger>
                            </MicroButton>
                        )}
                    </Flex>
                    <Text fs="p6" lh="s" color={getToken("text.medium")}>
                        Vote on referenda with your GIGAHDX to claim Governance Rewards!
                    </Text>
                </Box>
                <CollapsibleContent>
                    {referenda.length ? (
                        <div ref={gridRef}>
                            {/* Maps over Referenda component for GigaStake */}
                        </div>
                    ) : (
                        <OngoingReferendaEmptyState />
                    )}
                </CollapsibleContent>
            </Flex>
        </CollapsibleRoot>
    )
}
