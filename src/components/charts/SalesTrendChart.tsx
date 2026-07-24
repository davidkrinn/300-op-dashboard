"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

type Props = {
  data: { month: string; netSales: number }[]
}

export function SalesTrendChart({ data }: Props) {
  return (
    <section className="panel h-[320px]">
      <h2 className="mb-4 text-lg font-bold text-slate-900">Sales Trend</h2>
      <ResponsiveContainer width="100%" height="88%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0e7490" stopOpacity={0.7} />
              <stop offset="95%" stopColor="#0e7490" stopOpacity={0.06} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="netSales" stroke="#0e7490" strokeWidth={2} fill="url(#salesFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </section>
  )
}
