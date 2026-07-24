"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

type BrandRow = {
  brand: string
  sales: number
  yoyChangePct: number
}

export function BrandMixChart({ data }: { data: BrandRow[] }) {
  return (
    <section className="panel h-[320px]">
      <h2 className="mb-4 text-lg font-bold text-slate-900">Brand Performance</h2>
      <ResponsiveContainer width="100%" height="88%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
          <XAxis dataKey="brand" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#ea580c" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  )
}
