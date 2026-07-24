import { marginTrend } from "@/data/mockFinance"
import { monthlySales } from "@/data/mockSales"
import type { Insight } from "@/types/insights"

export function generateForecastInsights(): Insight[] {
  const latestSales = monthlySales[monthlySales.length - 1]
  const latestMargin = marginTrend[marginTrend.length - 1]

  return [
    {
      id: "forecast-sales",
      type: "forecast",
      priority: "medium",
      headline: "Next month sales expected to remain above plan",
      summary: "Current momentum and demand drivers suggest continued positive movement.",
      explanation: `Sales ended at ${latestSales.netSales.toFixed(1)}M with comp growth ${latestSales.compSalesPct.toFixed(1)}%, supporting a likely above-plan trajectory.`,
      recommendedAction: "Lock staffing plans now for top-growth states and monitor execution quality weekly.",
      affectedBrand: "Both",
      confidence: "medium",
      relatedMetrics: ["Net Sales", "Comp Sales", "Transactions"],
    },
    {
      id: "forecast-margin",
      type: "forecast",
      priority: "low",
      headline: "Margin trajectory remains stable",
      summary: `Gross margin is tracking ${latestMargin.grossMarginPct.toFixed(1)}%.`,
      explanation: "Input cost pressure appears controlled, supporting stable EBITDA margins in the near term.",
      recommendedAction: "Maintain vendor discipline and watch labor overtime in high-volume weeks.",
      affectedBrand: "Both",
      confidence: "high",
      relatedMetrics: ["Gross Margin %", "EBITDA Margin %"],
    },
  ]
}
