import { monthlySales, salesByBrand } from "@/data/mockSales"
import type { Insight } from "@/types/insights"
import type { Brand } from "@/types/brand"

export function generatePerformanceInsights(): Insight[] {
  const latest = monthlySales[monthlySales.length - 1]
  const prior = monthlySales[monthlySales.length - 2]
  const topBrand = [...salesByBrand].sort((a, b) => b.sales - a.sales)[0]

  return [
    {
      id: "perf-sales-trend",
      type: "performance",
      priority: latest.compSalesPct > 4 ? "high" : "medium",
      headline: `Portfolio comp sales at ${latest.compSalesPct.toFixed(1)}%`,
      summary: "Same-store momentum accelerated from the prior month.",
      explanation: `Comp sales moved from ${prior.compSalesPct.toFixed(1)}% to ${latest.compSalesPct.toFixed(1)}%, signaling broad-based demand strength.`,
      recommendedAction: "Protect momentum by preserving labor alignment for lunch and dinner dayparts.",
      affectedBrand: "Both",
      confidence: "high",
      relatedMetrics: ["Same Store Sales Growth", "Net Sales", "Transactions"],
    },
    {
      id: "perf-brand-leader",
      type: "performance",
      priority: "medium",
      headline: `${topBrand.brand} leads sales mix at ${topBrand.salesMixPct}%`,
      summary: "Brand mix concentration is favoring a single brand this period.",
      explanation: "Current brand mix indicates where promotion and staffing leverage are strongest.",
      recommendedAction: "Replicate top-selling menu and labor playbooks in underperforming markets.",
      affectedBrand: topBrand.brand as Brand,
      confidence: "medium",
      relatedMetrics: ["Brand Sales Mix", "Average Ticket"],
    },
  ]
}
