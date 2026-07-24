import type { KpiCard as KpiCardModel } from "@/types/kpi"
import { KpiCard } from "@/components/kpi/KpiCard"

export function KpiGrid({ cards }: { cards: KpiCardModel[] }) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <KpiCard key={card.id} card={card} />
      ))}
    </section>
  )
}
