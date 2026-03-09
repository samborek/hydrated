import { create } from "zustand"

export type LimitOrderEntry = {
    id: string
    sellAssetId: string
    buyAssetId: string
    sellAmount: string
    buyAmount: string
    limitPrice: number
    createdAt: number
}

type LimitOrderState = {
    orders: LimitOrderEntry[]
    /** Preview price shown on chart while user is typing */
    previewPrice: number | null
    addOrder: (order: Omit<LimitOrderEntry, "id" | "createdAt">) => void
    removeOrder: (id: string) => void
    clearOrders: () => void
    setPreviewPrice: (price: number | null) => void
}

export const useLimitOrderStore = create<LimitOrderState>((set) => ({
    orders: [],
    previewPrice: null,
    addOrder: (order) =>
        set((state) => ({
            orders: [
                ...state.orders,
                {
                    ...order,
                    id: crypto.randomUUID(),
                    createdAt: Date.now(),
                },
            ],
        })),
    removeOrder: (id) =>
        set((state) => ({
            orders: state.orders.filter((o) => o.id !== id),
        })),
    clearOrders: () => set({ orders: [] }),
    setPreviewPrice: (price) => set({ previewPrice: price }),
}))
