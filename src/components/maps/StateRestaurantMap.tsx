"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { LngLatBoundsLike, Map, Marker, NavigationControl, Popup } from "maplibre-gl"
import { TrendingDown, TrendingUp } from "lucide-react"
import { stores } from "@/data/mockStores"
import type { Brand } from "@/types/brand"
import "maplibre-gl/dist/maplibre-gl.css"
import type { FeatureCollection, GeoJsonProperties, Geometry, Polygon } from "geojson"
import statesAtlas from "us-atlas/states-10m.json"
import { feature } from "topojson-client"

type Bounds = {
  west: number
  south: number
  east: number
  north: number
}

const MAP_STYLE_URL = "https://tiles.openfreemap.org/styles/liberty"
const STATE_SOURCE_ID = "midwest-state-outlines"
const STATE_FILL_LAYER_ID = "midwest-state-fills"
const STATE_LINE_LAYER_ID = "midwest-state-lines"
const STATE_HIGHLIGHT_LAYER_ID = "midwest-state-highlight"

const MIDWEST_BOUNDS: Bounds = {
  west: -104.2,
  south: 40.3,
  east: -86.4,
  north: 49.1,
}

const STATE_BOUNDS: Record<string, Bounds> = {
  Minnesota: { west: -97.3, south: 43.4, east: -89.4, north: 49.1 },
  Wisconsin: { west: -92.9, south: 42.4, east: -86.7, north: 47.4 },
  Iowa: { west: -96.7, south: 40.3, east: -90.1, north: 43.6 },
  "South Dakota": { west: -104.1, south: 42.4, east: -96.4, north: 46.1 },
  "North Dakota": { west: -104.1, south: 45.9, east: -96.5, north: 49.1 },
}

const TARGET_STATE_IDS = new Set([19, 27, 38, 46, 55])

const STATE_NAME_BY_FIPS: Record<number, string> = {
  19: "Iowa",
  27: "Minnesota",
  38: "North Dakota",
  46: "South Dakota",
  55: "Wisconsin",
}

type AtlasFeature = {
  id: number | string
  geometry: Polygon
  properties?: Record<string, unknown>
}

type AtlasFeatureCollection = {
  features: AtlasFeature[]
}

type AtlasTopology = {
  objects: {
    states: unknown
  }
}

function buildStateOutlinesFromAtlas(): FeatureCollection<Polygon, { name: string }> {
  const atlas = statesAtlas as unknown as AtlasTopology
  const statesObject = atlas.objects.states
  const rawGeo = feature(atlas as never, statesObject as never) as FeatureCollection<Geometry, GeoJsonProperties> | { geometry: Geometry }
  const statesGeo: AtlasFeatureCollection =
    "features" in rawGeo
      ? ({ features: rawGeo.features as AtlasFeature[] } as AtlasFeatureCollection)
      : ({ features: [rawGeo as AtlasFeature] } as AtlasFeatureCollection)

  return {
    type: "FeatureCollection",
    features: statesGeo.features
      .map((stateFeature) => {
        const rawId = Number(stateFeature.id)
        if (!TARGET_STATE_IDS.has(rawId)) return null

        const name = STATE_NAME_BY_FIPS[rawId]
        if (!name) return null

        return {
          type: "Feature" as const,
          properties: { name },
          geometry: stateFeature.geometry,
        }
      })
      .filter((entry): entry is { type: "Feature"; properties: { name: string }; geometry: Polygon } => Boolean(entry)),
  }
}

const STATE_OUTLINES = buildStateOutlinesFromAtlas()

function markerColor(currentWeekSales: number, previousWeekSales: number): string {
  return currentWeekSales >= previousWeekSales ? "#16a34a" : "#dc2626"
}

function toLngLatBounds(bounds: Bounds): LngLatBoundsLike {
  return [
    [bounds.west, bounds.south],
    [bounds.east, bounds.north],
  ]
}

function setStateHighlightFilter(map: Map, selectedState: string) {
  if (!map.getLayer(STATE_HIGHLIGHT_LAYER_ID)) return

  if (selectedState === "All") {
    map.setFilter(STATE_HIGHLIGHT_LAYER_ID, ["==", ["get", "name"], ""])
    return
  }

  map.setFilter(STATE_HIGHLIGHT_LAYER_ID, ["==", ["get", "name"], selectedState])
}

type Props = {
  selectedState: string
  selectedBrand: "All" | Brand
}

export function StateRestaurantMap({ selectedState, selectedBrand }: Props) {
  const [activeStoreId, setActiveStoreId] = useState<string | null>(null)
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<Map | null>(null)
  const popupRef = useRef<Popup | null>(null)
  const markersRef = useRef<Marker[]>([])

  const filteredStores = useMemo(() => {
    return stores.filter((store) => {
      const stateMatch = selectedState === "All" || store.state === selectedState
      const brandMatch = selectedBrand === "All" || store.brand === selectedBrand
      return stateMatch && brandMatch
    })
  }, [selectedState, selectedBrand])

  const activeStore = filteredStores.find((store) => store.id === activeStoreId)

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    const map = new Map({
      container: mapContainerRef.current,
      style: MAP_STYLE_URL,
      center: [-94.5, 45.2],
      zoom: 5,
      minZoom: 3.5,
      maxZoom: 13,
      cooperativeGestures: true,
    })

    map.addControl(new NavigationControl({ showCompass: false }), "top-right")
    map.on("load", () => {
      map.addSource(STATE_SOURCE_ID, {
        type: "geojson",
        data: STATE_OUTLINES,
      })

      map.addLayer({
        id: STATE_FILL_LAYER_ID,
        type: "fill",
        source: STATE_SOURCE_ID,
        paint: {
          "fill-color": "#7c3aed",
          "fill-opacity": 0.08,
        },
      })

      map.addLayer({
        id: STATE_LINE_LAYER_ID,
        type: "line",
        source: STATE_SOURCE_ID,
        paint: {
          "line-color": "#6d28d9",
          "line-width": 1.6,
          "line-opacity": 0.65,
        },
      })

      map.addLayer({
        id: STATE_HIGHLIGHT_LAYER_ID,
        type: "line",
        source: STATE_SOURCE_ID,
        filter: ["==", ["get", "name"], ""],
        paint: {
          "line-color": "#4c1d95",
          "line-width": 3,
          "line-opacity": 0.95,
        },
      })

      setStateHighlightFilter(map, selectedState)
      map.fitBounds(toLngLatBounds(MIDWEST_BOUNDS), { padding: 24, duration: 0 })
    })

    mapRef.current = map

    return () => {
      popupRef.current?.remove()
      popupRef.current = null
      markersRef.current.forEach((marker) => marker.remove())
      markersRef.current = []
      map.remove()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current = []

    popupRef.current?.remove()
    popupRef.current = null

    filteredStores.forEach((store) => {
      const markerEl = document.createElement("button")
      markerEl.type = "button"
      markerEl.className = "h-4 w-4 rounded-full border-2 border-white shadow"
      markerEl.style.backgroundColor = markerColor(store.currentWeekSales, store.previousWeekSales)
      markerEl.setAttribute("aria-label", `View trend details for ${store.name}`)

      markerEl.addEventListener("click", () => {
        setActiveStoreId(store.id)
      })

      const marker = new Marker({ element: markerEl, anchor: "center" })
        .setLngLat([store.longitude, store.latitude])
        .addTo(map)

      markersRef.current.push(marker)
    })
  }, [filteredStores])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    const store = filteredStores.find((item) => item.id === activeStoreId)
    if (!store) {
      popupRef.current?.remove()
      popupRef.current = null
      return
    }

    popupRef.current?.remove()
    const popupHtml = `
      <div style="font-family: 'Avenir Next', 'Avenir', 'Segoe UI', sans-serif; min-width: 200px;">
        <div style="font-weight: 700; color: #0f172a; font-size: 13px;">${store.name}</div>
        <div style="color: #475569; font-size: 12px; margin-top: 2px;">${store.city}, ${store.state}</div>
        <div style="color: #334155; font-size: 12px; margin-top: 6px;">Prev $${store.previousWeekSales.toLocaleString()} · Curr $${store.currentWeekSales.toLocaleString()}</div>
      </div>
    `

    const popup = new Popup({ closeButton: false, offset: 14 })
      .setLngLat([store.longitude, store.latitude])
      .setHTML(popupHtml)
      .addTo(map)

    popupRef.current = popup
  }, [activeStoreId, filteredStores])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    const bounds = selectedState === "All" ? MIDWEST_BOUNDS : STATE_BOUNDS[selectedState] ?? MIDWEST_BOUNDS
    map.fitBounds(toLngLatBounds(bounds), { padding: 24, duration: 600 })
    setStateHighlightFilter(map, selectedState)
  }, [selectedState])

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
        <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
          <div ref={mapContainerRef} className="h-[420px] w-full" />
          <div className="pointer-events-none absolute bottom-2 left-2 rounded bg-white/90 px-2 py-1 text-[10px] text-slate-600 shadow-sm">
            Map: OpenFreeMap | Data: OpenStreetMap contributors, OpenMapTiles
          </div>
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
