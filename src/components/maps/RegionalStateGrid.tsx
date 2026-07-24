import type { StatePerformance } from "@/lib/calculations/calculateStatePerformance"

type Props = {
  states: StatePerformance[]
  selectedState: string
  onSelect: (state: string) => void
}

export function RegionalStateGrid({ states, selectedState, onSelect }: Props) {
  return (
    <section className="panel">
      <h2 className="mb-3 text-lg font-bold text-slate-900">Regional Heat View</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {states.map((state) => {
          const isActive = selectedState === state.state
          const intensity = Math.max(20, Math.min(95, Math.round(100 - state.riskIndex)))

          return (
            <button
              key={state.state}
              type="button"
              onClick={() => onSelect(isActive ? "All" : state.state)}
              className={`rounded-xl border p-4 text-left transition ${
                isActive ? "border-cyan-500 bg-cyan-50" : "border-slate-200 bg-white hover:border-cyan-300"
              }`}
            >
              <p className="text-sm font-semibold text-slate-900">{state.state}</p>
              <p className="text-xs text-slate-500">Comp sales {state.compSalesPct.toFixed(1)}%</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-teal-500" style={{ width: `${intensity}%` }} />
              </div>
              <p className="mt-2 text-xs text-slate-500">Health proxy {intensity}/100</p>
            </button>
          )
        })}
      </div>
    </section>
  )
}
