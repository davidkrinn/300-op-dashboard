"use client"

import { useMemo, useState } from "react"
import { calculateRegionalHealth } from "@/lib/calculations/calculateRegionalHealth"
import { calculateStatePerformance } from "@/lib/calculations/calculateStatePerformance"
import { calculateStoreRisk } from "@/lib/calculations/calculateStoreRisk"
import { stores } from "@/data/mockStores"

const STATES = ["Minnesota", "Wisconsin", "Iowa", "South Dakota", "North Dakota"] as const

export function RegionalManagerDashboard() {
  const [state, setState] = useState<(typeof STATES)[number]>("Minnesota")

  const view = useMemo(() => {
    const risks = calculateStoreRisk()
    const statePerf = calculateStatePerformance()
    const health = calculateRegionalHealth(statePerf, risks)

    const stateCode = state.slice(0, 2).toUpperCase()
    const storesInState = stores.filter((store) => store.id.startsWith(stateCode))
    const riskRows = risks.filter((risk) => risk.storeId.startsWith(stateCode))

    return {
      health: health.find((item) => item.state === state),
      storesInState,
      riskRows,
    }
  }, [state])

  return (
    <div className="space-y-6">
      <section className="panel bg-gradient-to-r from-slate-900 to-cyan-800 text-white">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Regional Deep Dive</p>
            <h2 className="text-3xl font-bold">Regional Manager Dashboard</h2>
            <p className="mt-2 text-sm text-cyan-100">Operational view optimized for intervention planning and store follow-up.</p>
          </div>
          <select
            value={state}
            onChange={(event) => setState(event.target.value as (typeof STATES)[number])}
            className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm"
          >
            {STATES.map((option) => (
              <option key={option} className="text-slate-900">
                {option}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="panel">
          <p className="text-sm text-slate-500">Regional Health Score</p>
          <p className="mt-2 text-4xl font-bold text-slate-900">{view.health?.healthScore ?? 0}</p>
        </article>
        <article className="panel">
          <p className="text-sm text-slate-500">Stores at Risk</p>
          <p className="mt-2 text-4xl font-bold text-slate-900">{view.riskRows.length}</p>
        </article>
        <article className="panel">
          <p className="text-sm text-slate-500">Comp Sales %</p>
          <p className="mt-2 text-4xl font-bold text-slate-900">{view.health?.compSalesPct.toFixed(1) ?? "0.0"}%</p>
        </article>
      </section>

      <section className="panel">
        <h3 className="text-lg font-bold text-slate-900">Recommended Store Visits</h3>
        <div className="mt-4 space-y-3">
          {view.riskRows.map((risk) => (
            <article key={risk.storeId} className="rounded-lg border border-slate-200 p-3">
              <p className="text-sm font-semibold text-slate-900">{risk.storeId}</p>
              <p className="mt-1 text-sm text-slate-600">Risk Level: {risk.riskLevel} ({risk.riskScore})</p>
              <p className="text-sm text-slate-500">Primary issue: {risk.drivers[0]}</p>
              <p className="mt-2 text-sm font-semibold text-cyan-700">Action: {risk.recommendedAction}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
