import { Flex, Separator } from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { getTokenPx } from "@galacticcouncil/ui/utils"
import { Outlet } from "@tanstack/react-router"
import { FC } from "react"

import { TradeOrders } from "@/modules/trade/orders/TradeOrders"
import { FormHeader } from "@/modules/trade/swap/components/FormHeader/FormHeader"
import { TradeChart } from "@/modules/trade/swap/components/TradeChart/TradeChart"

import { SSwapFormContainer } from "./SwapPage.styled"

export const SwapPageMobile: FC = () => {
  const { themeProps } = useTheme()

  return (
    <Flex direction="column" gap={getTokenPx("containers.paddings.primary")(themeProps as any)}>
      <SSwapFormContainer>
        <FormHeader />
        <Separator mx={`-${getTokenPx("containers.paddings.primary")(themeProps as any)}`} />
        <Outlet />
      </SSwapFormContainer>
      <TradeChart height={300} />
      <TradeOrders />
    </Flex>
  )
}
