import type { StoreRisk } from "@/types/store"
import type { StatePerformance } from "@/lib/calculations/calculateStatePerformance"

export type RegionalHealth = {
  state: string
  healthScore: number
  storesAtRisk: number
  compSalesPct: number
}

export function calculateRegionalHealth(statePerformance: StatePerformance[], storeRisks: StoreRisk[]): RegionalHealth[] {
  return statePerformance.map((stateRow) => {
    const riskCount = storeRisks.filter((risk) => risk.storeId.startsWith(stateRow.state.slice(0, 2).toUpperCase())).length
    const score = Math.max(30, Math.round(82 + stateRow.compSalesPct * 2 - riskCount * 4))

    return {
      state: stateRow.state,
      healthScore: score,
      storesAtRisk: riskCount,
      compSalesPct: stateRow.compSalesPct,
    }
  })
}
