"use client"

import { useMemo, useState } from "react"
import { AlertTriangle, TrendingUp } from "lucide-react"
import { BrandMixChart } from "@/components/charts/BrandMixChart"
import { ChannelMixChart } from "@/components/charts/ChannelMixChart"
import { SalesTrendChart } from "@/components/charts/SalesTrendChart"
import { InsightList } from "@/components/insights/InsightList"
import { KpiGrid } from "@/components/kpi/KpiGrid"
import { RegionalStateGrid } from "@/components/maps/RegionalStateGrid"
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

  return (
    <div className="space-y-6">
      <section className="panel bg-gradient-to-r from-cyan-700 to-orange-600 text-white">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-100">Morning Brief</p>
            <h2 className="mt-2 text-3xl font-bold">Sales are up across core markets with watchpoints in service execution.</h2>
            <p className="mt-2 max-w-3xl text-sm text-cyan-50">
              Top opportunity: event-driven demand in Minnesota. Top risk: elevated service pressure in select stores.
              Recommended action: reinforce peak-hour labor and monitor order accuracy across high-volume locations.
            </p>
          </div>
          <div className="flex gap-2">
            <select
              value={stateFilter}
              onChange={(event) => setStateFilter(event.target.value)}
              className="rounded-full border border-white/30 bg-white/10 px-3 py-2 text-sm text-white"
            >
              <option className="text-slate-900">All</option>
              {["Minnesota", "Wisconsin", "Iowa", "South Dakota", "North Dakota"].map((state) => (
                <option key={state} className="text-slate-900">
                  {state}
                </option>
              ))}
            </select>
            <select
              value={brandFilter}
              onChange={(event) => setBrandFilter(event.target.value as "All" | Brand)}
              className="rounded-full border border-white/30 bg-white/10 px-3 py-2 text-sm text-white"
            >
              <option className="text-slate-900">All</option>
              <option className="text-slate-900">Taco Bell</option>
              <option className="text-slate-900">Pizza Hut</option>
            </select>
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

      <RegionalStateGrid states={calculations.statePerformance} selectedState={stateFilter} onSelect={setStateFilter} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <SalesTrendChart data={monthlySales} />
        <BrandMixChart data={calculations.brandPerformance} />
        <ChannelMixChart data={calculations.channelMix} />
      </div>
    </div>
  )
}
