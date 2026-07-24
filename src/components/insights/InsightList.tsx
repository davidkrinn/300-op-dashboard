import type { Insight } from "@/types/insights"

function priorityClass(priority: Insight["priority"]) {
  if (priority === "high") return "bg-rose-100 text-rose-800 border-rose-300"
  if (priority === "medium") return "bg-amber-100 text-amber-800 border-amber-300"
  return "bg-slate-100 text-slate-700 border-slate-300"
}

export function InsightList({ insights }: { insights: Insight[] }) {
  return (
    <section className="panel">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">Priority Insights</h2>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Deterministic engine</span>
      </div>
      <div className="space-y-3">
        {insights.map((insight) => (
          <article key={insight.id} className="rounded-lg border border-slate-200 p-4">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className={`badge ${priorityClass(insight.priority)}`}>{insight.priority}</span>
              <span className="badge border-cyan-200 bg-cyan-50 text-cyan-800">{insight.type}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">{insight.headline}</h3>
            <p className="mt-1 text-sm text-slate-600">{insight.summary}</p>
            <p className="mt-2 text-sm text-slate-500">{insight.explanation}</p>
            <p className="mt-3 text-sm font-semibold text-cyan-700">Action: {insight.recommendedAction}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
