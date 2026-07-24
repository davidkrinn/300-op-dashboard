import { statusColors } from "@/lib/designTokens"
import { formatCurrency, formatNumber, formatPercent } from "@/lib/formatters/formatValues"
import type { KpiCard as KpiCardModel } from "@/types/kpi"

function formatValue(card: KpiCardModel): string {
  if (typeof card.value !== "number") return card.value

  if (card.format === "currency") return `${formatCurrency(card.value)}M`
  if (card.format === "percent") return formatPercent(card.value)
  return formatNumber(card.value)
}

export function KpiCard({ card }: { card: KpiCardModel }) {
  const deltaPrefix = card.previousPeriodChange >= 0 ? "+" : ""

  return (
    <article className="panel">
      <p className="text-sm font-medium text-slate-500">{card.label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-900">{formatValue(card)}</p>
      <div className="mt-3 flex items-center justify-between gap-2">
        <span className={`badge ${statusColors[card.status]}`}>{card.status}</span>
        <span className="text-xs font-semibold text-slate-600">
          {deltaPrefix}
          {card.previousPeriodChange.toFixed(1)}% vs prior
        </span>
      </div>
    </article>
  )
}
