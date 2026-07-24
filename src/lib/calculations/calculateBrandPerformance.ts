import { salesByBrand } from "@/data/mockSales"

export type BrandPerformance = {
  brand: "Taco Bell" | "Pizza Hut"
  sales: number
  salesMixPct: number
  yoyChangePct: number
}

export function calculateBrandPerformance(): BrandPerformance[] {
  return salesByBrand.map((entry, index) => ({
    brand: entry.brand as BrandPerformance["brand"],
    sales: entry.sales,
    salesMixPct: entry.salesMixPct,
    yoyChangePct: index === 0 ? 4.4 : 2.9,
  }))
}
