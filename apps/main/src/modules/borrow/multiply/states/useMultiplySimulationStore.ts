import { uuid } from "@galacticcouncil/utils"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export type SimulatedPosition = {
    id: string
    collateralAsset: {
        id: string
        symbol: string
        icon?: string
    }
    debtAsset: {
        id: string
        symbol: string
        icon?: string
    }
    leverage: number
    collateralAmount: string
    debtAmount: string
    netApy: number
    timestamp: number
}

interface MultiplySimulationStore {
    positions: SimulatedPosition[]
    addPosition: (position: Omit<SimulatedPosition, "id" | "timestamp">) => void
    removePosition: (id: string) => void
    clearPositions: () => void
}

export const useMultiplySimulationStore = create<MultiplySimulationStore>()(
    persist(
        (set) => ({
            positions: [],
            addPosition: (position) =>
                set((state) => ({
                    positions: [
                        {
                            ...position,
                            id: uuid(),
                            timestamp: Date.now(),
                        },
                        ...state.positions,
                    ],
                })),
            removePosition: (id) =>
                set((state) => ({
                    positions: state.positions.filter((p) => p.id !== id),
                })),
            clearPositions: () => set({ positions: [] }),
        }),
        {
            name: "multiply-simulation-storage",
        },
    ),
)
