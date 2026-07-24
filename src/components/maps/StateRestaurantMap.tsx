"use client"

import { useMemo, useState } from "react"
import { TrendingDown, TrendingUp } from "lucide-react"
import { stores } from "@/data/mockStores"
import type { Brand } from "@/types/brand"

function markerColor(currentWeekSales: number, previousWeekSales: number): string {
  return currentWeekSales >= previousWeekSales ? "#16a34a" : "#dc2626"
}

type Props = {
  selectedState: string
  selectedBrand: "All" | Brand
}

export function StateRestaurantMap({ selectedState, selectedBrand }: Props) {
  const [activeStoreId, setActiveStoreId] = useState<string | null>(null)

  const filteredStores = useMemo(() => {
    return stores.filter((store) => {
      const stateMatch = selectedState === "All" || store.state === selectedState
      const brandMatch = selectedBrand === "All" || store.brand === selectedBrand
      return stateMatch && brandMatch
    })
  }, [selectedState, selectedBrand])

  const activeStore = filteredStores.find((store) => store.id === activeStoreId)
  const mapPoints = useMemo(() => {
    const minLat = 41
    const maxLat = 49
    const minLng = -101.5
    const maxLng = -88
    const width = 940
    const height = 420

    return filteredStores.map((store) => {
      const x = ((store.longitude - minLng) / (maxLng - minLng)) * width
      const y = ((maxLat - store.latitude) / (maxLat - minLat)) * height
      return { store, x, y }
    })
  }, [filteredStores])

  return (
    <section className="panel">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Restaurant Location Trend Map</h2>
          <p className="text-sm text-slate-600">
            {selectedState === "All" ? "Midwest portfolio view" : `${selectedState} view`} with pins indicating week-over-week total sales trend.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-emerald-700">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" /> Trending Up
          </span>
          <span className="flex items-center gap-1.5 text-rose-700">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-600" /> Trending Down
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.3fr_1fr]">
        <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-gradient-to-br from-slate-100 via-indigo-50 to-violet-100">
          <svg viewBox="0 0 940 420" className="h-[420px] w-full">
            <rect x="25" y="30" width="180" height="170" rx="14" fill="#ede9fe" stroke="#a78bfa" />
            <text x="45" y="58" fontSize="14" fill="#5b21b6" fontWeight="700">North Dakota</text>

            <rect x="220" y="30" width="200" height="170" rx="14" fill="#ede9fe" stroke="#a78bfa" />
            <text x="245" y="58" fontSize="14" fill="#5b21b6" fontWeight="700">Minnesota</text>

            <rect x="430" y="42" width="180" height="190" rx="14" fill="#ede9fe" stroke="#a78bfa" />
            <text x="452" y="70" fontSize="14" fill="#5b21b6" fontWeight="700">Wisconsin</text>

            <rect x="35" y="215" width="190" height="165" rx="14" fill="#ede9fe" stroke="#a78bfa" />
            <text x="58" y="242" fontSize="14" fill="#5b21b6" fontWeight="700">South Dakota</text>

            <rect x="245" y="225" width="220" height="155" rx="14" fill="#ede9fe" stroke="#a78bfa" />
            <text x="275" y="252" fontSize="14" fill="#5b21b6" fontWeight="700">Iowa</text>

            {mapPoints.map(({ store, x, y }) => {
              const selected = activeStoreId === store.id
              return (
                <g key={store.id} onClick={() => setActiveStoreId(store.id)} className="cursor-pointer">
                  <circle cx={x} cy={y} r={selected ? 10 : 8} fill={markerColor(store.currentWeekSales, store.previousWeekSales)} stroke="#ffffff" strokeWidth="2" />
                  {selected ? (
                    <g>
                      <rect x={x + 10} y={y - 40} width="205" height="60" rx="8" fill="#111827" opacity="0.93" />
                      <text x={x + 20} y={y - 20} fontSize="11" fill="#ffffff" fontWeight="700">{store.name}</text>
                      <text x={x + 20} y={y - 6} fontSize="10" fill="#e5e7eb">
                        {store.city}, {store.state}
                      </text>
                      <text x={x + 20} y={y + 8} fontSize="10" fill="#e5e7eb">
                        Prev ${store.previousWeekSales.toLocaleString()} · Curr ${store.currentWeekSales.toLocaleString()}
                      </text>
                    </g>
                  ) : null}
                </g>
              )
            })}
          </svg>
        </div>

        <div className="space-y-2">
          {filteredStores.map((store) => {
            const salesDelta = store.currentWeekSales - store.previousWeekSales
            const trendUp = salesDelta >= 0

            return (
              <button
                key={store.id}
                type="button"
                onClick={() => setActiveStoreId(store.id)}
                className={`w-full rounded-lg border p-3 text-left ${activeStoreId === store.id ? "border-violet-400 bg-violet-50" : "border-slate-200 bg-white"}`}
              >
                <p className="text-sm font-semibold text-slate-900">{store.name}</p>
                <p className="text-xs text-slate-500">
                  {store.brand} · {store.city}, {store.state}
                </p>
                <p className={`mt-1 flex items-center gap-1 text-xs font-semibold ${trendUp ? "text-emerald-700" : "text-rose-700"}`}>
                  {trendUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {trendUp ? "Trending Up" : "Trending Down"} ({trendUp ? "+" : ""}{((salesDelta / store.previousWeekSales) * 100).toFixed(1)}%)
                </p>
              </button>
            )
          })}
        </div>
      </div>

      {activeStore ? (
        <p className="mt-3 text-xs text-slate-500">
          Selected: {activeStore.name} ({activeStore.city}, {activeStore.state})
        </p>
      ) : null}
    </section>
  )
}
