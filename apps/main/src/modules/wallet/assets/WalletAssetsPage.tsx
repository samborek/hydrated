import {
  CollapsibleContent,
  CollapsibleRoot,
  CollapsibleTrigger,
  Flex,
  Grid,
  Icon,
  MicroButton,
  SectionHeader,
  Text,
} from "@galacticcouncil/ui/components"
import { useBreakpoints } from "@galacticcouncil/ui/theme"
import { ChevronDown, ChevronUp } from "@galacticcouncil/ui/assets/icons"
import { getToken } from "@galacticcouncil/ui/utils"
import { useAccount } from "@galacticcouncil/web3-connect"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { lazy, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"

import { useDataTableUrlPagination } from "@/hooks/useDataTableUrlPagination"
import { useDataTableUrlSearch } from "@/hooks/useDataTableUrlSearch"
import { useDataTableUrlSorting } from "@/hooks/useDataTableUrlSorting"
import { HollarBanner } from "@/modules/borrow/hollar/HollarBanner"
import { WalletBalances } from "@/modules/wallet/assets/Balances/WalletBalances"
import { MyAssets } from "@/modules/wallet/assets/MyAssets/MyAssets"
import { MyLiquidity } from "@/modules/wallet/assets/MyLiquidity/MyLiquidity"
import { WalletRewards } from "@/modules/wallet/assets/Rewards/WalletRewards"
import { YieldOpportunities } from "@/modules/wallet/assets/YieldOpportunities"
import { WalletEmptyState } from "@/modules/wallet/WalletEmptyState"

const WalletAssetFiltersDesktop = lazy(async () => ({
  default: await import(
    "@/modules/wallet/assets/WalletAssetsFilters.desktop"
  ).then((m) => m.WalletAssetFiltersDesktop),
}))

const WalletAssetFiltersMobile = lazy(async () => ({
  default: await import(
    "@/modules/wallet/assets/WalletAssetsFilters.mobile"
  ).then((m) => m.WalletAssetFiltersMobile),
}))

export const WalletAssetsPage = () => {
  const { account } = useAccount()
  const { isMobile } = useBreakpoints()
  const navigate = useNavigate()
  const { t } = useTranslation(["wallet", "common"])
  const [isCollapsed, setIsCollapsed] = useState(false)

  const assetsPagination = useDataTableUrlPagination(
    "/wallet/assets",
    "assetsPage",
    10,
  )

  const liquidityPagination = useDataTableUrlPagination(
    "/wallet/assets",
    "liquidityPage",
    10,
  )

  const [searchPhrase, setSearchPhrase] = useDataTableUrlSearch(
    "/wallet/assets",
    "search",
    {
      onChange: () => {
        assetsPagination.onPageClick(1)
        liquidityPagination.onPageClick(1)
      },
    },
  )

  const assetsSorting = useDataTableUrlSorting("/wallet/assets", "assetsSort", {
    onChange: () => assetsPagination.onPageClick(1),
  })

  const liquiditySorting = useDataTableUrlSorting(
    "/wallet/assets",
    "liquiditySort",
    { onChange: () => liquidityPagination.onPageClick(1) },
  )

  const changeSearch = (phrase: string): void => {
    setSearchPhrase(phrase)
    assetsPagination.onPageClick(1)
    liquidityPagination.onPageClick(1)
  }

  const { category, chain, showSmallBalances } = useSearch({
    from: "/wallet/assets",
  })

  const handleToggleSmallBalances = useCallback(
    (checked: boolean) => {
      navigate({
        to: "/wallet/assets",
        search: (prev) => ({ ...prev, showSmallBalances: checked }),
      })
    },
    [navigate],
  )

  if (!account) {
    return <WalletEmptyState />
  }

  return (
    <Flex direction="column">
      <HollarBanner />
      <CollapsibleRoot
        open={!isCollapsed}
        onOpenChange={(open) => setIsCollapsed(!open)}
      >
        <SectionHeader
          title={t("wallet:overview.title")}
          noTopPadding
          actions={
            <MicroButton
              asChild
              sx={{ display: "flex", alignItems: "center", gap: "s" }}
            >
              <CollapsibleTrigger sx={{ cursor: "pointer" }}>
                <Text
                  fw={500}
                  fs="p6"
                  lh={1.4}
                  color={getToken("text.medium")}
                  transform="uppercase"
                >
                  {isCollapsed ? t("common:show") : t("common:hide")}
                </Text>
                <Icon
                  size="xs"
                  component={isCollapsed ? ChevronDown : ChevronUp}
                  color={getToken("icons.onContainer")}
                />
              </CollapsibleTrigger>
            </MicroButton>
          }
        />

        <CollapsibleContent>
          <Grid
            sx={{
              alignItems: "stretch",
              overflowX: ["auto", "visible"],
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
            columnGap={["base", "xl"]}
            columnTemplate={[
              "calc(100% - 60px) 280px",
              "calc(100% - 60px) 280px",
              "1fr minmax(0, 25rem)",
            ]}
            pb={isMobile ? "base" : "xxl"}
          >
            <WalletBalances />
            <WalletRewards />
          </Grid>
        </CollapsibleContent>
      </CollapsibleRoot>
      {isMobile ? (
        <WalletAssetFiltersMobile
          chain={chain}
          searchPhrase={searchPhrase}
          onSearchPhraseChange={changeSearch}
        />
      ) : (
        <WalletAssetFiltersDesktop />
      )}

      <Flex direction="column">
        {(category === "all" || category === "assets") && (
          <MyAssets
            key={account.address + "_assets"}
            searchPhrase={searchPhrase}
            onSearchPhraseChange={changeSearch}
            showSmallBalances={showSmallBalances}
            onToggleSmallBalances={handleToggleSmallBalances}
            paginationProps={assetsPagination}
            sortingProps={assetsSorting}
          />
        )}
        {(category === "all" || category === "liquidity") && (
          <MyLiquidity
            key={account.address + "_liquidity"}
            searchPhrase={searchPhrase}
            paginationProps={liquidityPagination}
            sortingProps={liquiditySorting}
          />
        )}
      </Flex>

      <YieldOpportunities />
    </Flex>
  )
}
