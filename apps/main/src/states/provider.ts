import { create } from "zustand"
import { persist } from "zustand/middleware"

import { getProviderDataEnv, PROVIDER_URLS, TDataEnv } from "@/config/rpc"

type RpcListStore = {
  rpcList: Array<{
    name?: string
    url: string
  }>
  addRpc: (account: string) => void
  removeRpc: (url: string) => void
  renameRpc: (url: string, newName: string) => void
}

export const useRpcListStore = create<RpcListStore>()(
  persist(
    (set) => ({
      rpcList: [],
      addRpc: (url) =>
        set((store) => ({ rpcList: [...store.rpcList, { url }] })),
      removeRpc: (urlToRemove) =>
        set((store) => ({
          rpcList: store.rpcList.filter((rpc) => rpc.url !== urlToRemove),
        })),
      renameRpc: (urlToRename, name) =>
        set((store) => ({
          rpcList: store.rpcList.map((rpc) =>
            rpc.url === urlToRename ? { ...rpc, name } : rpc,
          ),
        })),
    }),
    {
      name: "rpcList",
    },
  ),
)

type ProviderRpcUrlState = {
  rpcUrl: string
  squidUrl: string
  rpcUrlList: string[]
  autoMode: boolean
  updatedAt: number
}

type ProviderRpcUrlStore = ProviderRpcUrlState & {
  setRpcUrl: (rpcUrl: string | undefined) => void
  setSquidUrl: (squidUrl: string | undefined) => void
  setRpcUrlList: (rpcUrlList: string[], updatedAt: number) => void
  getDataEnv: () => TDataEnv
  setAutoMode: (state: boolean) => void
}

export const useProviderRpcUrlStore = create<ProviderRpcUrlStore>()(
  persist(
    (set, get) => ({
      rpcUrl: import.meta.env.VITE_PROVIDER_URL ?? PROVIDER_URLS[0] ?? "",
      squidUrl: import.meta.env.VITE_SQUID_URL,
      rpcUrlList: PROVIDER_URLS,
      updatedAt: 0,
      autoMode: true,
      setRpcUrl: (rpcUrl) => set({ rpcUrl }),
      setSquidUrl: (squidUrl) => set({ squidUrl }),
      setRpcUrlList: (rpcUrlList, updatedAt) => set({ rpcUrlList, updatedAt }),
      setAutoMode: (state) => set({ autoMode: state }),
      getDataEnv: () => {
        const { rpcUrl } = get()
        return getProviderDataEnv(rpcUrl)
      },
    }),
    {
      name: "rpcUrl",
      version: 2.3,
      migrate: (persistedState) => persistedState as ProviderRpcUrlState,
    },
  ),
)
