"use client"

import { useMemo, useState } from "react"
import { AlertTriangle, TrendingUp } from "lucide-react"
import { BrandMixChart } from "@/components/charts/BrandMixChart"
import { ChannelMixChart } from "@/components/charts/ChannelMixChart"
import { SalesTrendChart } from "@/components/charts/SalesTrendChart"
import { InsightList } from "@/components/insights/InsightList"
import { KpiGrid } from "@/components/kpi/KpiGrid"
import { StateRestaurantMap } from "@/components/maps/StateRestaurantMap"
import { monthlySales } from "@/data/mockSales"
import { stores } from "@/data/mockStores"
import { calculateBrandPerformance } from "@/lib/calculations/calculateBrandPerformance"
import { calculateChannelMix } from "@/lib/calculations/calculateChannelMix"
import { calculateKpis } from "@/lib/calculations/calculateKpis"
import { calculateStatePerformance } from "@/lib/calculations/calculateStatePerformance"
import { calculateStoreRisk } from "@/lib/calculations/calculateStoreRisk"
import { applyInsightFilters, applyRiskFilters } from "@/lib/filters/applyFilters"
import { generateInsights } from "@/lib/insights/generateInsights"
import { defaultFilters } from "@/types/filters"
import type { Brand } from "@/types/brand"

export function ExecutiveDashboard() {
  const [stateFilter, setStateFilter] = useState<string>("All")
  const [brandFilter, setBrandFilter] = useState<"All" | Brand>("All")

  const calculations = useMemo(() => {
    const kpis = calculateKpis()
    const statePerformance = calculateStatePerformance()
    const brandPerformance = calculateBrandPerformance()
    const channelMix = calculateChannelMix()
    const risk = calculateStoreRisk()
    const insights = generateInsights()

    const filters = {
      ...defaultFilters,
      states: stateFilter === "All" ? [] : [stateFilter as never],
      brands: brandFilter === "All" ? [] : [brandFilter],
    }

    return {
      kpis,
      statePerformance,
      brandPerformance: brandFilter === "All" ? brandPerformance : brandPerformance.filter((row) => row.brand === brandFilter),
      channelMix,
      risk: applyRiskFilters(risk, filters),
      insights: applyInsightFilters(insights, filters),
    }
  }, [stateFilter, brandFilter])

  const topRisk = calculations.risk[0]
  const topInsight = calculations.insights[0]
  const topOpportunity = calculations.insights.find((insight) => insight.type === "opportunity")
  const topRiskInsight = calculations.insights.find((insight) => insight.type === "risk")
  const recommendedAction = topRiskInsight?.recommendedAction ?? "Reinforce peak-hour labor and monitor order accuracy across high-volume locations."

  return (
    <div className="space-y-6">
      <section className="panel bg-[radial-gradient(circle_at_top,_#7e22ce_0%,_#9333ea_45%,_#c084fc_100%)] py-4 text-white md:py-5">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-100">Today's Top Insight</p>
          <h2 className="mt-1.5 text-2xl font-bold leading-tight md:text-3xl">Sales are up across core markets with watchpoints in service execution.</h2>
          <div className="mt-3.5 grid grid-cols-1 gap-2.5 md:grid-cols-3 md:gap-3">
            <article className="flex min-h-[120px] flex-col rounded-lg border border-white/60 bg-white p-3.5 md:min-h-[132px] md:p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-purple-700">Top Opportunity</p>
              <p className="mt-1.5 text-sm leading-snug text-slate-700">{topOpportunity?.headline ?? "Event-driven demand is building in Minnesota."}</p>
            </article>
            <article className="flex min-h-[120px] flex-col rounded-lg border border-white/60 bg-white p-3.5 md:min-h-[132px] md:p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-purple-700">Top Risk</p>
              <p className="mt-1.5 text-sm leading-snug text-slate-700">{topRiskInsight?.headline ?? "Elevated service pressure in select stores."}</p>
            </article>
            <article className="flex min-h-[120px] flex-col rounded-lg border border-white/60 bg-white p-3.5 md:min-h-[132px] md:p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-purple-700">Recommended Action</p>
              <p className="mt-1.5 text-sm leading-snug text-slate-700">{recommendedAction}</p>
            </article>
          </div>
        </div>
      </section>

      <KpiGrid cards={calculations.kpis} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.3fr_1fr]">
        <InsightList insights={calculations.insights.slice(0, 4)} />
        <section className="panel">
          <h2 className="text-lg font-bold text-slate-900">Watchlist</h2>
          <div className="mt-4 space-y-3">
            <article className="rounded-lg border border-rose-200 bg-rose-50 p-3">
              <p className="flex items-center gap-2 text-sm font-semibold text-rose-800">
                <AlertTriangle size={16} />
                Top Risk Store
              </p>
              <p className="mt-1 text-sm text-rose-700">{topRisk ? `${topRisk.storeId} at score ${topRisk.riskScore}` : "No high-risk stores under current filters."}</p>
            </article>
            <article className="rounded-lg border border-cyan-200 bg-cyan-50 p-3">
              <p className="flex items-center gap-2 text-sm font-semibold text-cyan-800">
                <TrendingUp size={16} />
                Top Insight
              </p>
              <p className="mt-1 text-sm text-cyan-700">{topInsight?.headline ?? "No insights match current filters."}</p>
            </article>
          </div>
          <p className="mt-5 text-xs text-slate-500">
            Showing {calculations.risk.length} stores with risk signals out of {stores.length} tracked stores.
          </p>
        </section>
      </div>

      <section className="panel">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-lg font-bold text-slate-900">Filters</h2>
          <div className="flex flex-wrap gap-2">
            <select
              value={stateFilter}
              onChange={(event) => setStateFilter(event.target.value)}
              className="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
            >
              <option>All</option>
              {["Minnesota", "Wisconsin", "Iowa", "South Dakota", "North Dakota"].map((state) => (
                <option key={state}>{state}</option>
              ))}
            </select>
            <select
              value={brandFilter}
              onChange={(event) => setBrandFilter(event.target.value as "All" | Brand)}
              className="rounded-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
            >
              <option>All</option>
              <option>Taco Bell</option>
              <option>Pizza Hut</option>
            </select>
          </div>
        </div>
      </section>

      <StateRestaurantMap selectedState={stateFilter} selectedBrand={brandFilter} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <SalesTrendChart data={monthlySales} />
        <BrandMixChart data={calculations.brandPerformance} />
        <ChannelMixChart data={calculations.channelMix} />
      </div>
    </div>
  )
}
