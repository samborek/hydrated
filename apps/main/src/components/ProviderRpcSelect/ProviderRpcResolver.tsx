import { getBestRpcs } from "@galacticcouncil/utils"
import { useQueryClient } from "@tanstack/react-query"
import { PropsWithChildren, useEffect, useState } from "react"
import { useAsyncFn } from "react-use"
import { first, prop } from "remeda"

import { PROVIDER_URLS } from "@/config/rpc"
import { rpcStatusQueryOptions } from "@/api/rpc"
import { useProviderRpcUrlStore } from "@/states/provider"

const BEST_RPC_TIMEOUT_MS = 6000

export const ProvideRpcResolver: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const queryClient = useQueryClient()

  const [isBestProviderFound, setIsBestProviderFound] = useState(
    () => !useProviderRpcUrlStore.getState().autoMode,
  )

  const [, fetchBestProvider] = useAsyncFn(async () => {
    const fallbackRpcUrl =
      import.meta.env.VITE_PROVIDER_URL ?? PROVIDER_URLS[0] ?? ""

    try {
      const result = await Promise.race<
        Awaited<ReturnType<typeof getBestRpcs>> | null
      >([
        getBestRpcs(PROVIDER_URLS),
        new Promise<null>((resolve) =>
          setTimeout(() => resolve(null), BEST_RPC_TIMEOUT_MS),
        ),
      ])

      if (!result || result.length === 0) {
        throw new Error("No RPCs resolved")
      }

      const bestRpc = first(result)

      if (bestRpc) {
        queryClient.setQueryData(
          rpcStatusQueryOptions(bestRpc.url).queryKey,
          bestRpc,
        )
      }

      // top RPC results are added to the top of the list
      const urls = result.map(prop("url"))
      const sortedRpcList = Array.from(new Set([...urls, ...PROVIDER_URLS]))

      useProviderRpcUrlStore.setState({
        rpcUrl: bestRpc?.url ?? fallbackRpcUrl,
        rpcUrlList: sortedRpcList,
        updatedAt: Date.now(),
      })
    } catch (error) {
      // Fall back quickly when RPC discovery stalls or fails.
      useProviderRpcUrlStore.setState({
        rpcUrl: fallbackRpcUrl,
        rpcUrlList: PROVIDER_URLS,
        updatedAt: Date.now(),
      })
    } finally {
      setIsBestProviderFound(true)
    }
  }, [queryClient])

  useEffect(() => {
    if (isBestProviderFound) {
      const loader = window.document.querySelector(".loader-container")
      if (loader) {
        // Removes initial static loader in index.html.
        loader.remove()
      }

      return
    }

    fetchBestProvider()
  }, [fetchBestProvider, isBestProviderFound])

  if (!isBestProviderFound) return null

  return children
}
