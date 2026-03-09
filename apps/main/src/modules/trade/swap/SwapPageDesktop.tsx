import {
  Box,
  Grid,
  Separator,
  Stack,
  Toggle,
  ToggleRoot,
  ToggleLabel,
} from "@galacticcouncil/ui/components"
import { Outlet } from "@tanstack/react-router"
import { useState } from "react"

import { TradeOrders } from "@/modules/trade/orders/TradeOrders"
import { FormHeader } from "@/modules/trade/swap/components/FormHeader/FormHeader"
import { OrderBook } from "@/modules/trade/swap/components/OrderBook/OrderBook"
import { PageHeader } from "@/modules/trade/swap/components/PageHeader/PageHeader"
import { TradeChart } from "@/modules/trade/swap/components/TradeChart/TradeChart"

import { SSwapFormContainer } from "./SwapPage.styled"

export const TRADE_CHART_DESKTOP_HEIGHT = 460

export const SwapPageDesktop = () => {
  const [isOrderBookInSidebar, setIsOrderBookInSidebar] = useState(true)

  const toggleOrderBook = () => setIsOrderBookInSidebar((prev) => !prev)

  return (
    <Box sx={{ width: "100%", maxWidth: 1300, mx: "auto" }}>
      <Stack gap="xl">
        <PageHeader
          actions={
            <ToggleRoot onClick={toggleOrderBook}>
              <ToggleLabel>
                Order book: {isOrderBookInSidebar ? "SIDEBAR" : "CHART"}
              </ToggleLabel>
              <Toggle
                checked={isOrderBookInSidebar}
                onCheckedChange={() => {}}
              />
            </ToggleRoot>
          }
        />
        <Grid
          columnTemplate={[
            "1fr",
            "1fr",
            "minmax(24rem, 1fr) minmax(0, 25rem)",
            "minmax(30rem, 1fr) minmax(0, 27rem)",
          ]}
          rowTemplate={["auto auto auto", "auto auto auto", "auto auto", "auto auto"]}
          gap="xl"
          align="start"
        >
          <TradeChart
            height={TRADE_CHART_DESKTOP_HEIGHT}
            orderBook={
              !isOrderBookInSidebar ? <OrderBook variant="compact" /> : null
            }
          />
          <Stack
            gridColumn={[1, 1, 2, 2]}
            gridRow={[2, 2, "1/-1", "1/-1"]}
            gap="xl"
          >
            <SSwapFormContainer>
              <FormHeader />
              <Separator mx={-20} />
              <Outlet />
            </SSwapFormContainer>
            {isOrderBookInSidebar && <OrderBook />}
          </Stack>
          <TradeOrders
            gridColumn={[1, 1, "1/-1", 1]}
            gridRow={[3, 3, 2, 2]}
          />
        </Grid>
      </Stack>
    </Box>
  )
}
