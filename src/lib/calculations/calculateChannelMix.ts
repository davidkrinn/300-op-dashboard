import { channelMix } from "@/data/mockChannelMix"

export function calculateChannelMix() {
  const totals = new Map<string, number>()

  for (const row of channelMix) {
    const current = totals.get(row.channel) ?? 0
    totals.set(row.channel, current + row.mixPct)
  }

  const summed = [...totals.entries()].map(([channel, total]) => ({
    channel,
    mixPct: total / 2,
  }))

  return summed.sort((a, b) => b.mixPct - a.mixPct)
}
