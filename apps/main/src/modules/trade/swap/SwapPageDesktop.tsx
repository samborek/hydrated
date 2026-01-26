import { Grid, Separator, Stack } from "@galacticcouncil/ui/components"
import { useTheme } from "@galacticcouncil/ui/theme"
import { getTokenRem } from "@galacticcouncil/ui/utils"
import { Outlet } from "@tanstack/react-router"

import { TradeOrders } from "@/modules/trade/orders/TradeOrders"
import { FormHeader } from "@/modules/trade/swap/components/FormHeader/FormHeader"
import { PageHeader } from "@/modules/trade/swap/components/PageHeader/PageHeader"
import { TradeChart } from "@/modules/trade/swap/components/TradeChart/TradeChart"

import { SSwapFormContainer } from "./SwapPage.styled"

export const SwapPageDesktop = () => {
  const { themeProps } = useTheme()

  return (
    <Stack gap={getTokenRem("containers.paddings.primary")(themeProps as any)}>
      <PageHeader />
      <Grid
        columnTemplate={[
          null,
          null,
          "minmax(24.375rem, 1fr) minmax(0, 25rem)",
          "minmax(29.375rem, 1fr) minmax(0, 27.5rem)",
        ]}
        rowTemplate="auto auto"
        gap={getTokenRem("containers.paddings.primary")(themeProps as any)}
        align="start"
      >
        <TradeChart height={456} />
        <SSwapFormContainer gridColumn={2} gridRow={[null, null, null, "1/-1"]}>
          <FormHeader />
          <Separator mx={`-${getTokenRem("containers.paddings.primary")(themeProps as any)}`} />
          <Outlet />
        </SSwapFormContainer>
        <TradeOrders gridColumn={[null, null, "1/-1", "1"]} />
      </Grid>
    </Stack>
  )
}
