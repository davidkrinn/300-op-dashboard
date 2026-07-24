import type { Brand } from "@/types/brand"
import type { SalesChannel } from "@/types/channel"
import type { RiskLevel } from "@/types/insights"
import type { StateName } from "@/types/region"

export type DashboardFilters = {
  states: StateName[]
  brands: Brand[]
  stores: string[]
  timePeriod: "today" | "week" | "month" | "quarter" | "year" | "yoy"
  channels: SalesChannel[]
  riskLevels: RiskLevel[]
}

export const defaultFilters: DashboardFilters = {
  states: [],
  brands: [],
  stores: [],
  timePeriod: "month",
  channels: [],
  riskLevels: [],
}
