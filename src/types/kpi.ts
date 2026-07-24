export type KpiStatus = "positive" | "neutral" | "warning" | "critical"

export type KpiCard = {
  id: string
  label: string
  value: number | string
  previousPeriodChange: number
  yearOverYearChange?: number
  status: KpiStatus
  description?: string
  format?: "currency" | "number" | "percent" | "duration" | "rating"
}
