import { Account, useAccount, Web3ConnectModal } from "@galacticcouncil/web3-connect"
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { createRootRouteWithContext, HeadContent } from "@tanstack/react-router"
import { lazy, Suspense } from "react"

import { useAccountPermitNonce, useAccountUniques } from "@/api/account"
import { assetsQuery } from "@/api/assets"
import { useInvalidateOnBlock } from "@/api/chain"
import { useSquidClient } from "@/api/provider"
import { usePriceSubscriber } from "@/api/spotPrice"
import { useAccountBalanceSubscription } from "@/api/subscriptions"
import { RouterContext } from "@/App"
import { LayoutSkeleton } from "@/modules/layout/components/LayoutSkeleton"
import { useHasTopNavbar } from "@/modules/layout/hooks/useHasTopNavbar"
import { MainLayout } from "@/modules/layout/MainLayout"
import { useXcScanSubscription } from "@/modules/xcm/history"
import { AssetsProvider } from "@/providers/assetsProvider"
import { RpcProvider, useRpcProvider } from "@/providers/rpcProvider"

const MobileTabBar = lazy(async () => ({
  default: await import(
    "@/modules/layout/components/MobileTabBar/MobileTabBar"
  ).then((m) => m.MobileTabBar),
}))

const TransactionManager = lazy(async () => ({
  default: await import("@/modules/transactions/TransactionManager").then(
    (m) => m.TransactionManager,
  ),
}))

const ReactQueryDevtools = lazy(() =>
  import("@tanstack/react-query-devtools").then((m) => ({
    default: m.ReactQueryDevtools,
  })),
)

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  pendingComponent: LayoutSkeleton,
  head: ({
    match: {
      context: { i18n },
    },
  }) => ({
    meta: [
      {
        title: i18n.t("common:meta.title"),
      },
      {
        name: "description",
        content: i18n.t("common:meta.description"),
      },
    ],
  }),
})

function RootComponent() {
  const hasTopNavbar = useHasTopNavbar()

  return (
    <>
      <HeadContent />
      <AssetsProvider>
        <RpcProvider>
          <MainLayout />
          <Services />
          <Suspense>{!hasTopNavbar && <MobileTabBar />}</Suspense>
        </RpcProvider>
      </AssetsProvider>
      {hasTopNavbar && (
        <Suspense>
          <ReactQueryDevtools buttonPosition="bottom-left" />
        </Suspense>
      )}
    </>
  )
}

function ApiSubscriptions() {
  const rpcProvider = useRpcProvider()
  const queryClient = useQueryClient()

  useInvalidateOnBlock()
  useAccountBalanceSubscription()
  useAccountUniques()
  usePriceSubscriber()
  useSuspenseQuery(assetsQuery(rpcProvider, queryClient))
  useAccountPermitNonce()

  return null
}

function AccountSubscriptions({ account }: { account: Account }) {
  useXcScanSubscription(account.address)

  return null
}

function Services() {
  const squidSdk = useSquidClient()
  const { isConnected, account } = useAccount()
  const { isApiLoaded } = useRpcProvider()

  return (
    <>
      <Suspense>
        <TransactionManager />
      </Suspense>
      <Suspense>
        <Web3ConnectModal squidSdk={squidSdk} />
      </Suspense>
      {isApiLoaded && <ApiSubscriptions />}
      {isConnected && <AccountSubscriptions account={account} />}
    </>
  )
}
