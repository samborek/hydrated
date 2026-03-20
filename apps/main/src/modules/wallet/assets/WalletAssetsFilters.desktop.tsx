import { WalletIcon } from "@galacticcouncil/ui/assets/icons"
import { Button, Flex, Icon, Text } from "@galacticcouncil/ui/components"
import { getToken } from "@galacticcouncil/ui/utils"
import { Link, useLocation } from "@tanstack/react-router"
import { FC } from "react"
import { useTranslation } from "react-i18next"

import { TabItem } from "@/components/TabMenu"
import { ChainIcon } from "@/modules/wallet/assets/ChainIcons"
import { useChainBalances } from "@/modules/wallet/assets/useChainBalances"
import {
  ChainKey,
  walletChainFiltersItems,
} from "@/modules/wallet/assets/WalletAssetFilters.items"

export const WalletAssetFiltersDesktop: FC = () => {
  const { t } = useTranslation()
  const chainBalances = useChainBalances()

  return (
    <Flex align="center" justify="space-between">
      <Flex align="center" gap="s">
        {walletChainFiltersItems.map((item) => {
          const chainKey = item.search?.chain as ChainKey
          const chainBalance = chainBalances[chainKey]
          return (
            <ChainTabItem
              key={chainKey}
              item={item}
              chainKey={chainKey}
              balance={chainBalance?.balance}
              isLoading={chainBalance?.isLoading}
            />
          )
        })}
      </Flex>
      <Button variant="tertiary" size="small" outline>
        <Icon component={WalletIcon} size="s" />
        {t("wallet.connectAnotherWallet", "Connect another wallet")}
      </Button>
    </Flex>
  )
}

type ChainTabItemProps = {
  item: TabItem
  chainKey: string
  balance?: string
  isLoading?: boolean
}

const ChainTabItem: FC<ChainTabItemProps> = ({
  item,
  chainKey,
  balance,
  isLoading,
}) => {
  const { t } = useTranslation(["wallet", "common"])
  const path = useLocation({ select: (state) => state.href })
  const currentSearch = useLocation({ select: (state) => state.search })

  const isActive =
    path.startsWith(item.to) &&
    (item.search
      ? Object.entries(item.search).every(
          ([key, value]) =>
            currentSearch[key as keyof typeof currentSearch] === value,
        )
      : true)

  const formattedBalance = balance
    ? t("common:currency", { value: balance })
    : null

  const showBalance = chainKey !== "all" && formattedBalance && !isLoading

  return (
    <Flex
      asChild
      align="center"
      sx={{
        height: 42,
        px: 16,
        py: 8,
        gap: 4,
        borderRadius: 32,
        background: isActive
          ? getToken("buttons.primary.medium.rest")
          : getToken("buttons.outlineDark.rest"),
        cursor: "pointer",
        transition: "background 0.2s ease",
        textDecoration: "none",
        "&:hover": {
          background: isActive
            ? getToken("buttons.primary.medium.hover")
            : getToken("colors.darkBlue.alpha.200"),
        },
      }}
    >
      <Link
        to={item.to}
        search={{ ...currentSearch, ...item.search }}
        resetScroll={item.resetScroll}
      >
        {chainKey !== "all" && <ChainIcon chain={chainKey} size={16} />}
        <Flex direction="column" align="flex-start" sx={{ gap: "2px" }}>
          <Text
            sx={{
              fontSize: 12,
              fontWeight: 500,
              lineHeight: "15px",
              color: isActive
                ? getToken("buttons.primary.medium.onButton")
                : getToken("buttons.secondary.low.onRest"),
            }}
          >
            {item.title}
          </Text>
          {showBalance && (
            <Text
              sx={{
                fontSize: 11,
                fontWeight: 400,
                lineHeight: "11px",
                opacity: 0.7,
                color: isActive
                  ? getToken("buttons.primary.medium.onButton")
                  : getToken("buttons.secondary.low.onRest"),
              }}
            >
              {formattedBalance}
            </Text>
          )}
        </Flex>
      </Link>
    </Flex>
  )
}
