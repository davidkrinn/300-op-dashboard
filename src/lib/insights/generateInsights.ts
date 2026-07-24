import type { Insight } from "@/types/insights"
import { generateForecastInsights } from "@/lib/insights/generateForecastInsights"
import { generateOpportunityInsights } from "@/lib/insights/generateOpportunityInsights"
import { generatePerformanceInsights } from "@/lib/insights/generatePerformanceInsights"
import { generateRiskInsights } from "@/lib/insights/generateRiskInsights"
import { rankInsights } from "@/lib/insights/rankInsights"

export function generateInsights(): Insight[] {
  return rankInsights([
    ...generateRiskInsights(),
    ...generatePerformanceInsights(),
    ...generateOpportunityInsights(),
    ...generateForecastInsights(),
  ])
}
