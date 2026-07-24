import { monthlySales } from "@/data/mockSales"
import { storePortfolio } from "@/data/mockStorePortfolio"
import type { StateName } from "@/types/region"

export type StatePerformance = {
  state: StateName
  netSales: number
  compSalesPct: number
  riskIndex: number
}

export function calculateStatePerformance(): StatePerformance[] {
  const latestMonth = monthlySales[monthlySales.length - 1]
  const totalStores = storePortfolio.reduce((acc, item) => acc + item.totalStores, 0)
  const performanceFactors = [1.08, 0.96, 1.02, 0.93, 0.9]

  return storePortfolio.map((stateRow, index) => {
    const storeShare = stateRow.totalStores / totalStores
    const baselineSales = latestMonth.netSales * storeShare
    const netSales = Number((baselineSales * performanceFactors[index]).toFixed(2))
    const compSalesPct = Number((latestMonth.compSalesPct + (performanceFactors[index] - 1) * 10).toFixed(1))

    return {
      state: stateRow.state as StateName,
      netSales,
      compSalesPct,
      riskIndex: Math.max(15, Math.round(55 - compSalesPct * 6)),
    }
  })
}
