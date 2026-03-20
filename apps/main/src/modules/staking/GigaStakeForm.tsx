import { Flex, Paper, Separator } from "@galacticcouncil/ui/components"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"

import { SHeaderTab } from "@/modules/trade/swap/components/FormHeader/FormHeader.styled"

export const gigastakeOptions = ["gigastake", "giga-unstake", "claim", "migrate"] as const
export type GigaStakeOption = (typeof gigastakeOptions)[number]

export const GigaStakeForm: FC = () => {
    const { t } = useTranslation(["common", "staking"])
    const [type, setType] = useState<GigaStakeOption>("gigastake")

    return (
        <Paper>
            <Flex px="m" py="m" align="center" gap="s" sx={{ overflowX: "auto" }}>
                {gigastakeOptions.map((option) => (
                    <SHeaderTab
                        key={option}
                        data-status={option === type ? "active" : "inactive"}
                        onClick={() => setType(option)}
                        style={{ padding: "8px 12px", whiteSpace: "nowrap" }}
                    >
                        {option === "gigastake" && "GIGASTAKE"}
                        {option === "giga-unstake" && "UNSTAKE"}
                        {option === "claim" && "CLAIM UNLOCK"}
                        {option === "migrate" && "MIGRATE"}
                    </SHeaderTab>
                ))}
            </Flex>
            <Separator />

            <Flex p="xl" direction="column" gap="m">
                {type === "gigastake" && (
                    <div>Supply your HDX to get GIGAHDX and earn automatically compounding rewards.</div>
                )}
                {type === "giga-unstake" && (
                    <div>Withdraw your GIGAHDX over a ~222 day cooldown period.</div>
                )}
                {type === "claim" && (
                    <div>Claim your fully unlocked HDX after the cooldown period has ended.</div>
                )}
                {type === "migrate" && (
                    <div>Migrate your existing staked HDX and unclaimed rewards to GIGAHDX directly.</div>
                )}
            </Flex>
        </Paper>
    )
}
