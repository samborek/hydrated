import { Search } from "@galacticcouncil/ui/assets/icons"
import {
  DataTableRef,
  Flex,
  Icon,
  Input,
  Label,
  SectionHeader,
  Text,
  Toggle,
} from "@galacticcouncil/ui/components"
import { useBreakpoints } from "@galacticcouncil/ui/theme"
import { FC, useId, useRef } from "react"
import { useTranslation } from "react-i18next"

import { PaginationProps } from "@/hooks/useDataTableUrlPagination"
import { SortingProps } from "@/hooks/useDataTableUrlSorting"
import { MyAssetsTable } from "@/modules/wallet/assets/MyAssets/MyAssetsTable"
import { useMyAssetsTableData } from "@/modules/wallet/assets/MyAssets/MyAssetsTable.data"

type Props = {
  readonly searchPhrase: string
  readonly onSearchPhraseChange: (phrase: string) => void
  readonly showSmallBalances: boolean
  readonly onToggleSmallBalances: (checked: boolean) => void
  readonly paginationProps: PaginationProps
  readonly sortingProps: SortingProps
}

export const MyAssets: FC<Props> = ({
  searchPhrase,
  onSearchPhraseChange,
  showSmallBalances,
  onToggleSmallBalances,
  paginationProps,
  sortingProps,
}) => {
  const { t } = useTranslation(["wallet", "common"])
  const { isMobile } = useBreakpoints()
  const inputId = useId()

  const tableRef = useRef<DataTableRef>(null)

  const { data, isLoading } = useMyAssetsTableData(showSmallBalances)

  return (
    <>
      <SectionHeader
        title={t("myAssets.header.title")}
        actions={
          <Flex align="center" gap="s" sx={{ flex: 1, justifyContent: "space-between", ml: "12px" }}>
            {!isMobile ? (
              <Input
                id={inputId}
                value={searchPhrase}
                placeholder={t("wallet.searchAssets", "Search assets")}
                sx={{
                  width: 140,
                  "& input": {
                    py: "xs",
                    fontSize: "0.75rem",
                  }
                }}
                leadingElement={
                  <Label asChild htmlFor={inputId}>
                    <Icon
                      as="label"
                      sx={{ cursor: "text" }}
                      size="xs"
                      component={Search}
                    />
                  </Label>
                }
                onChange={(e) => onSearchPhraseChange(e.target.value)}
              />
            ) : (
              <span />
            )}
            <Flex align="center" gap="s">
              <Text fs="p5">{t("wallet.showSmallBalances", "Show small balances")}</Text>
              <Toggle
                name="showSmallBalances"
                size="medium"
                checked={showSmallBalances}
                onCheckedChange={onToggleSmallBalances}
              />
            </Flex>
          </Flex>
        }
      />
      <MyAssetsTable
        ref={tableRef}
        data={data}
        isLoading={isLoading}
        searchPhrase={searchPhrase}
        paginationProps={paginationProps}
        sortingProps={sortingProps}
      />
    </>
  )
}
