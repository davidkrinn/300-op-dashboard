import Link from "next/link"
import { stores } from "@/data/mockStores"
import { calculateStoreRisk } from "@/lib/calculations/calculateStoreRisk"

export function StoreDetailDashboard({ storeId }: { storeId: string }) {
  const store = stores.find((item) => item.id === storeId)
  const risk = calculateStoreRisk().find((item) => item.storeId === storeId)

  if (!store || !risk) {
    return (
      <section className="panel">
        <h2 className="text-2xl font-bold text-slate-900">Store not found</h2>
        <Link href="/" className="mt-3 inline-block text-sm font-semibold text-cyan-700">
          Return to executive dashboard
        </Link>
      </section>
    )
  }

  return (
    <div className="space-y-6">
      <section className="panel bg-gradient-to-r from-slate-900 to-slate-700 text-white">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-300">Store Detail</p>
        <h2 className="mt-2 text-3xl font-bold">{store.id}</h2>
        <p className="text-sm text-slate-200">
          {store.brand} · {store.city}, {store.state}
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <article className="panel">
          <p className="text-sm text-slate-500">Risk Score</p>
          <p className="mt-2 text-4xl font-bold text-slate-900">{risk.riskScore}</p>
          <p className="text-sm text-slate-600">Risk Level: {risk.riskLevel}</p>
        </article>
        <article className="panel">
          <p className="text-sm text-slate-500">Store Profile</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            <li>Volume Tier: {store.volumeTier}</li>
            <li>Opened: {store.openedYear}</li>
            <li>Drive-thru: {store.driveThru ? "Yes" : "No"}</li>
            <li>Staffing Target: {store.staffingTarget}</li>
          </ul>
        </article>
      </section>

      <section className="panel">
        <h3 className="text-lg font-bold text-slate-900">Risk Drivers</h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {risk.drivers.map((driver) => (
            <li key={driver}>- {driver}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm font-semibold text-cyan-700">Recommended action: {risk.recommendedAction}</p>
      </section>
    </div>
  )
}
