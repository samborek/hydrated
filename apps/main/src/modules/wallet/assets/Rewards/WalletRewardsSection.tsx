import { Button, Flex, Text, ValueStats } from "@galacticcouncil/ui/components"
import { getToken, pxToRem } from "@galacticcouncil/ui/utils"
import { FC } from "react"
import { useTranslation } from "react-i18next"

import { useDisplayAssetPrice } from "@/components/AssetPrice"
import { useClaimAllWalletRewards } from "@/modules/wallet/assets/Rewards/WalletRewardsSection.claim"
import { useWalletRewardsSectionData } from "@/modules/wallet/assets/Rewards/WalletRewardsSection.data"
import { SWalletRewardsSection } from "@/modules/wallet/assets/Rewards/WalletRewardsSection.styled"

type Props = {
  readonly title?: string
}

export const WalletRewardsSection: FC<Props> = ({ title }) => {
  const { t } = useTranslation(["wallet", "common"])

  const { incentives, farming, staking, isEmpty, isLoading } =
    useWalletRewardsSectionData()

  const claimAll = useClaimAllWalletRewards()

  const [incentivesDisplay] = useDisplayAssetPrice(
    incentives.assetId,
    incentives.value,
  )

  const [farmingDisplay] = useDisplayAssetPrice(farming.assetId, farming.value)

  return (
    <SWalletRewardsSection gap="s">
      {title && (
        <Text fs="p4" fw={500} color={getToken("text.medium")}>
          {title}
        </Text>
      )}
      <ValueStats
        wrap
        size="small"
        label={t("rewards.incentives")}
        value={incentivesDisplay}
        isLoading={incentives.loading}
      />
      <ValueStats
        wrap
        size="small"
        label={t("rewards.farmingRewards")}
        value={farmingDisplay}
        isLoading={farming.loading}
      />
      <ValueStats
        wrap
        size="small"
        label={t("rewards.allocated")}
        value={t("common:currency", {
          value: staking.value,
          symbol: staking.symbol,
        })}
        isLoading={staking.loading}
      />
      <Flex direction="column" gap="xs" mt="s">
        <Button
          width="100%"
          disabled={isEmpty}
          onClick={() => claimAll.mutate()}
        >
          {isEmpty && !isLoading
            ? t("rewards.claim.empty")
            : t("rewards.claim")}
        </Button>
        <Text fs={pxToRem(9)} lh={1} color={getToken("text.low")} align="center">
          {t("rewards.claim.description")}
        </Text>
      </Flex>
    </SWalletRewardsSection>
  )
}
