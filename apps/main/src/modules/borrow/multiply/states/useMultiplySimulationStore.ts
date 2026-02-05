import { uuid } from "@galacticcouncil/utils";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PositionStatus = "open" | "closing" | "closed";
export type PositionStrategy = "bull" | "bear";

export type SimulatedPosition = {
  id: string;
  collateralAsset: {
    id: string;
    symbol: string;
    icon?: string;
  };
  debtAsset: {
    id: string;
    symbol: string;
    icon?: string;
  };
  leverage: number;
  collateralAmount: string;
  debtAmount: string;
  netApy: number;
  timestamp: number;
  // New fields
  strategy: PositionStrategy;
  entryPrice: string;
  liquidationPrice: string;
  status: PositionStatus;
  pnl?: string;
};

interface MultiplySimulationStore {
  positions: SimulatedPosition[];
  addPosition: (
    position: Omit<SimulatedPosition, "id" | "timestamp" | "status">,
  ) => void;
  updatePosition: (id: string, updates: Partial<SimulatedPosition>) => void;
  removePosition: (id: string) => void;
  clearPositions: () => void;
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
              status: "open",
            },
            ...state.positions,
          ],
        })),
      updatePosition: (id, updates) =>
        set((state) => ({
          positions: state.positions.map((p) =>
            p.id === id ? { ...p, ...updates } : p,
          ),
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
);
