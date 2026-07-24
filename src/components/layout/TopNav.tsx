import Link from "next/link"

const links = [
  { href: "/", label: "Executive" },
  { href: "/regional", label: "Regional" },
  { href: "/insights", label: "Insights" },
]

export function TopNav() {
  return (
    <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Taco Hut Enterprises</p>
        <h1 className="text-3xl font-bold text-slate-900">Executive Command Dashboard</h1>
      </div>
      <nav className="flex gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-700"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
