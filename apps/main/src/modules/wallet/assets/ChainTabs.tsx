import { Button, Flex, Icon } from "@galacticcouncil/ui/components"
import { Link } from "@tanstack/react-router"
import { FC, ReactNode } from "react"

import { TabItem } from "@/components/TabMenu"

type ChainTabsProps = {
  readonly items: readonly TabItem[]
  readonly activeChain: string
  readonly renderIcon?: (chain: string) => ReactNode
}

export const ChainTabs: FC<ChainTabsProps> = ({
  items,
  activeChain,
  renderIcon,
}) => {
  return (
    <Flex gap="s" align="center">
      {items.map((item) => {
        const chainKey = item.search?.chain as string
        const isActive = chainKey === activeChain

        return (
          <Button
            key={chainKey}
            variant={isActive ? "secondary" : "muted"}
            size="small"
            asChild
          >
            <Link to={item.to} search={item.search} resetScroll={item.resetScroll}>
              {renderIcon && (
                <Icon size="s" component={() => renderIcon(chainKey)} />
              )}
              {item.title}
            </Link>
          </Button>
        )
      })}
    </Flex>
  )
}
