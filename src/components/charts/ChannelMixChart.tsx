"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const COLORS = ["#0e7490", "#ea580c", "#2563eb", "#16a34a", "#a16207"]

type ChannelRow = { channel: string; mixPct: number }

export function ChannelMixChart({ data }: { data: ChannelRow[] }) {
  return (
    <section className="panel h-[320px]">
      <h2 className="mb-4 text-lg font-bold text-slate-900">Channel Mix</h2>
      <ResponsiveContainer width="100%" height="88%">
        <PieChart>
          <Pie data={data} dataKey="mixPct" nameKey="channel" innerRadius={55} outerRadius={95}>
            {data.map((entry, index) => (
              <Cell key={`${entry.channel}-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </section>
  )
}
