import { Box, Flex, SectionHeader } from "@galacticcouncil/ui/components"
import { FC } from "react"
import { useTranslation } from "react-i18next"

import { MyPositionsTable } from "@/modules/borrow/multiply/components/MyPositionsTable"

import { MyLoopingActions } from "./MyLoopingActions"

type Props = {
    readonly searchPhrase?: string
}

export const MyLooping: FC<Props> = ({ searchPhrase }) => {
    const { t } = useTranslation("wallet")

    return (
        <Box>
            <Flex justify="space-between" align="center">
                <Box pt={28}>
                    <SectionHeader>
                        {t("myLooping.header.title", "Looping")}
                    </SectionHeader>
                </Box>
                <MyLoopingActions />
            </Flex>
            <MyPositionsTable searchPhrase={searchPhrase} />
        </Box>
    )
}
