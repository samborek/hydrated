import { ClassNames } from "@emotion/react"
import { Flex, Grid, SectionHeader } from "@galacticcouncil/ui/components"
import { useBreakpoints } from "@galacticcouncil/ui/theme"
import { FC } from "react"
import { useTranslation } from "react-i18next"

import { GigaStakeChart } from "@/modules/staking/GigaStakeChart"
import { GigaStakeForm } from "@/modules/staking/GigaStakeForm"
import { GigaStakeReferenda } from "@/modules/staking/GigaStakeReferenda"
import { GigaStakeStats } from "@/modules/staking/GigaStakeStats"

export const GigaStake: FC = () => {
  const { t } = useTranslation(["staking", "common"])
  const { isMobile, isTablet } = useBreakpoints()

  if (isMobile || isTablet) {
    return (
      <Flex direction="column" gap="base">
        <GigaStakeReferenda />
        <Flex direction="column" gap="xl">
          <SectionHeader title={t("gigastake.title", "GIGASTAKE Dashboard")} />
          <GigaStakeStats />
          <GigaStakeForm />
          <GigaStakeChart />
        </Flex>
      </Flex>
    )
  }

  return (
    <Flex direction="column" gap="xl">
      <Grid
        columnTemplate={[
          null,
          null,
          "minmax(24rem, 1fr) minmax(0, 25rem)",
          "minmax(30rem, 1fr) minmax(0, 27rem)",
        ]}
        columnGap="xl"
        align="start"
      >
        <ClassNames>
          {({ css }) => (
            <Flex
              direction="column"
              gap="xs"
              className={css({ gridColumn: "1/-1" })}
            >
              <SectionHeader
                noTopPadding
                title={t("gigastake.title", "GIGASTAKE Dashboard")}
              />
            </Flex>
          )}
        </ClassNames>

        <Flex direction="column" gap="xl">
          <GigaStakeStats />
          <GigaStakeChart />
        </Flex>

        <GigaStakeForm />
      </Grid>

      <GigaStakeReferenda />
    </Flex>
  )
}

