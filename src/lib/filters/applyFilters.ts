import type { DashboardFilters } from "@/types/filters"
import type { Insight } from "@/types/insights"
import type { StoreRisk } from "@/types/store"
import { stores } from "@/data/mockStores"

export function applyInsightFilters(insights: Insight[], filters: DashboardFilters): Insight[] {
  return insights.filter((insight) => {
    const stateMatch = filters.states.length === 0 || (insight.affectedState ? filters.states.includes(insight.affectedState) : true)
    const brandMatch = filters.brands.length === 0 || (insight.affectedBrand ? insight.affectedBrand === "Both" || filters.brands.includes(insight.affectedBrand) : true)

    return stateMatch && brandMatch
  })
}

export function applyRiskFilters(risks: StoreRisk[], filters: DashboardFilters): StoreRisk[] {
  return risks.filter((risk) => {
    const store = stores.find((entry) => entry.id === risk.storeId)
    if (!store) return false

    const stateMatch = filters.states.length === 0 || filters.states.includes(store.state as never)
    const brandMatch = filters.brands.length === 0 || filters.brands.includes(store.brand as never)
    const riskMatch = filters.riskLevels.length === 0 || filters.riskLevels.includes(risk.riskLevel)

    return stateMatch && brandMatch && riskMatch
  })
}
