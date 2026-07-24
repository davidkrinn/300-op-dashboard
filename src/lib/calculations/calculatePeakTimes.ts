import { hourlyOrderVolume } from "@/data/mockOrders"

export function calculatePeakTimes() {
  const ordered = [...hourlyOrderVolume].sort((a, b) => b.orders - a.orders)
  const topThree = ordered.slice(0, 3)

  return {
    topThree,
    peakHour: topThree[0],
    byHour: hourlyOrderVolume,
  }
}
