"use client"

import { useMemo, useState } from "react"
import { generateInsights } from "@/lib/insights/generateInsights"
import type { InsightPriority, InsightType } from "@/types/insights"

const types: Array<"all" | InsightType> = ["all", "performance", "risk", "opportunity", "forecast"]
const priorities: Array<"all" | InsightPriority> = ["all", "high", "medium", "low"]

export function InsightsCenter() {
  const [type, setType] = useState<(typeof types)[number]>("all")
  const [priority, setPriority] = useState<(typeof priorities)[number]>("all")
  const insights = useMemo(() => generateInsights(), [])

  const filtered = insights.filter((insight) => {
    const typeMatch = type === "all" || insight.type === type
    const priorityMatch = priority === "all" || insight.priority === priority
    return typeMatch && priorityMatch
  })

  return (
    <div className="space-y-6">
      <section className="panel bg-gradient-to-r from-orange-600 to-cyan-700 text-white">
        <p className="text-xs uppercase tracking-[0.18em] text-orange-100">Insights Center</p>
        <h2 className="mt-2 text-3xl font-bold">Explainable insights ranked by urgency and confidence</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <select value={type} onChange={(event) => setType(event.target.value as (typeof types)[number])} className="rounded-full bg-white/10 px-3 py-2 text-sm">
            {types.map((item) => (
              <option key={item} className="text-slate-900">
                {item}
              </option>
            ))}
          </select>
          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value as (typeof priorities)[number])}
            className="rounded-full bg-white/10 px-3 py-2 text-sm"
          >
            {priorities.map((item) => (
              <option key={item} className="text-slate-900">
                {item}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="space-y-3">
        {filtered.map((insight) => (
          <article key={insight.id} className="panel">
            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-slate-500">
              {insight.type} · {insight.priority} · confidence {insight.confidence}
            </p>
            <h3 className="mt-1 text-xl font-bold text-slate-900">{insight.headline}</h3>
            <p className="mt-2 text-sm text-slate-600">{insight.summary}</p>
            <p className="mt-2 text-sm text-slate-500">{insight.explanation}</p>
            <p className="mt-3 text-sm font-semibold text-cyan-700">Action: {insight.recommendedAction}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
