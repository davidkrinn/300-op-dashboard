import type { Brand } from "@/types/brand"
import type { StateName } from "@/types/region"

export type InsightType = "performance" | "risk" | "opportunity" | "forecast"
export type InsightPriority = "high" | "medium" | "low"
export type InsightConfidence = "high" | "medium" | "low"
export type RiskLevel = "low" | "medium" | "high" | "critical"

export type Insight = {
  id: string
  type: InsightType
  priority: InsightPriority
  headline: string
  summary: string
  explanation: string
  recommendedAction: string
  affectedBrand?: Brand | "Both"
  affectedState?: StateName
  affectedStores?: string[]
  confidence: InsightConfidence
  relatedMetrics: string[]
}
