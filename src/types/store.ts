import type { Brand } from "@/types/brand"
import type { RiskLevel } from "@/types/insights"
import type { StateName } from "@/types/region"

export type Store = {
  id: string
  brand: Brand
  state: StateName
  city: string
  volumeTier: "Low" | "Medium" | "High"
  openedYear: number
  squareFeet: number
  driveThru: boolean
  staffingTarget: number
}

export type StoreRisk = {
  storeId: string
  riskScore: number
  riskLevel: RiskLevel
  drivers: string[]
  recommendedAction: string
}
