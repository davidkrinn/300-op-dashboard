"use client"

import { useMemo, useState } from "react"
import { TrendingDown, TrendingUp } from "lucide-react"
import { stores } from "@/data/mockStores"
import type { Brand } from "@/types/brand"

type GeoPoint = {
  lat: number
  lng: number
}

type ScreenPoint = {
  x: number
  y: number
}

type StatePolygon = {
  name: string
  points: GeoPoint[]
}

const MAP_WIDTH = 940
const MAP_HEIGHT = 420

const GEO_BOUNDS = {
  minLat: 40.3,
  maxLat: 49.1,
  minLng: -104.2,
  maxLng: -86.4,
}

const STATE_POLYGONS: StatePolygon[] = [
  {
    name: "North Dakota",
    points: [
      { lat: 49.0, lng: -104.05 },
      { lat: 49.0, lng: -97.23 },
      { lat: 46.0, lng: -96.6 },
      { lat: 46.0, lng: -104.05 },
    ],
  },
  {
    name: "South Dakota",
    points: [
      { lat: 45.95, lng: -104.05 },
      { lat: 45.95, lng: -96.45 },
      { lat: 42.48, lng: -96.45 },
      { lat: 42.48, lng: -104.05 },
    ],
  },
  {
    name: "Minnesota",
    points: [
      { lat: 49.0, lng: -97.2 },
      { lat: 49.0, lng: -95.0 },
      { lat: 48.8, lng: -92.8 },
      { lat: 47.3, lng: -89.5 },
      { lat: 46.2, lng: -92.2 },
      { lat: 45.7, lng: -92.9 },
      { lat: 43.5, lng: -91.2 },
      { lat: 43.5, lng: -95.2 },
      { lat: 45.0, lng: -95.2 },
      { lat: 46.3, lng: -95.2 },
      { lat: 48.0, lng: -96.6 },
    ],
  },
  {
    name: "Iowa",
    points: [
      { lat: 43.5, lng: -96.64 },
      { lat: 43.5, lng: -90.14 },
      { lat: 40.38, lng: -90.14 },
      { lat: 40.38, lng: -95.8 },
      { lat: 41.6, lng: -96.5 },
    ],
  },
  {
    name: "Wisconsin",
    points: [
      { lat: 47.3, lng: -92.9 },
      { lat: 47.1, lng: -90.7 },
      { lat: 46.6, lng: -90.0 },
      { lat: 45.8, lng: -87.0 },
      { lat: 44.5, lng: -86.8 },
      { lat: 42.5, lng: -87.0 },
      { lat: 42.5, lng: -90.7 },
      { lat: 43.5, lng: -91.2 },
      { lat: 45.7, lng: -92.9 },
    ],
  },
]

function markerColor(currentWeekSales: number, previousWeekSales: number): string {
  return currentWeekSales >= previousWeekSales ? "#16a34a" : "#dc2626"
}

function projectPoint(point: GeoPoint): ScreenPoint {
  const x = ((point.lng - GEO_BOUNDS.minLng) / (GEO_BOUNDS.maxLng - GEO_BOUNDS.minLng)) * MAP_WIDTH
  const y = ((GEO_BOUNDS.maxLat - point.lat) / (GEO_BOUNDS.maxLat - GEO_BOUNDS.minLat)) * MAP_HEIGHT
  return { x, y }
}

function polygonPath(points: ScreenPoint[]): string {
  if (points.length === 0) return ""
  return `M ${points.map((point) => `${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" L ")} Z`
}

function isPointInPolygon(point: ScreenPoint, polygon: ScreenPoint[]): boolean {
  let inside = false

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x
    const yi = polygon[i].y
    const xj = polygon[j].x
    const yj = polygon[j].y

    const intersect = yi > point.y !== yj > point.y && point.x < ((xj - xi) * (point.y - yi)) / (yj - yi + 0.0000001) + xi
    if (intersect) inside = !inside
  }

  return inside
}

function polygonCentroid(polygon: ScreenPoint[]): ScreenPoint {
  const total = polygon.reduce(
    (acc, point) => {
      acc.x += point.x
      acc.y += point.y
      return acc
    },
    { x: 0, y: 0 },
  )

  return {
    x: total.x / polygon.length,
    y: total.y / polygon.length,
  }
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
  const polygons = useMemo(() => {
    return STATE_POLYGONS.map((statePolygon) => {
      const projected = statePolygon.points.map(projectPoint)
      return {
        name: statePolygon.name,
        points: projected,
        path: polygonPath(projected),
        centroid: polygonCentroid(projected),
      }
    })
  }, [])

  const polygonByName = useMemo(() => {
    return new Map(polygons.map((polygon) => [polygon.name, polygon]))
  }, [polygons])

  const mapPoints = useMemo(() => {
    return filteredStores.map((store) => {
      const projected = projectPoint({ lat: store.latitude, lng: store.longitude })
      const statePolygon = polygonByName.get(store.state)

      if (!statePolygon) {
        return { store, x: projected.x, y: projected.y }
      }

      const inside = isPointInPolygon(projected, statePolygon.points)
      if (inside) {
        return { store, x: projected.x, y: projected.y }
      }

      return {
        store,
        x: statePolygon.centroid.x,
        y: statePolygon.centroid.y,
      }
    })
  }, [filteredStores, polygonByName])

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
          <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} className="h-[420px] w-full">
            {polygons.map((polygon) => {
              const isFocused = selectedState === "All" || selectedState === polygon.name
              return (
                <g key={polygon.name}>
                  <path
                    d={polygon.path}
                    fill={isFocused ? "#ddd6fe" : "#ede9fe"}
                    stroke={isFocused ? "#7c3aed" : "#a78bfa"}
                    strokeWidth={isFocused ? 2.4 : 1.7}
                    opacity={isFocused ? 1 : 0.6}
                  />
                  <text
                    x={polygon.centroid.x}
                    y={polygon.centroid.y}
                    fontSize="13"
                    fill="#5b21b6"
                    fontWeight="700"
                    textAnchor="middle"
                    opacity={isFocused ? 1 : 0.7}
                  >
                    {polygon.name}
                  </text>
                </g>
              )
            })}

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
