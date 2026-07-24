import { customerExperience } from "@/data/mockCustomerExperience"
import { operationsKpis } from "@/data/mockOperations"
import { stores } from "@/data/mockStores"
import type { RiskLevel } from "@/types/insights"
import type { StoreRisk } from "@/types/store"

function toRiskLevel(score: number): RiskLevel {
  if (score >= 75) return "critical"
  if (score >= 50) return "high"
  if (score >= 25) return "medium"
  return "low"
}

export function calculateStoreRisk(): StoreRisk[] {
  const latestCx = customerExperience[customerExperience.length - 1]
  const speed = operationsKpis.find((item) => item.metric === "Speed of Service (sec)")
  const accuracy = operationsKpis.find((item) => item.metric === "Order Accuracy %")

  return stores.map((store, index) => {
    const base = store.volumeTier === "High" ? 48 : store.volumeTier === "Medium" ? 36 : 26
    const speedPenalty = speed && speed.value > speed.target ? 10 : 0
    const accuracyPenalty = accuracy && accuracy.value < accuracy.target ? 8 : 0
    const complaintPenalty = latestCx.complaintRatePct > 1.6 ? 6 : 2
    const agePenalty = store.openedYear < 2012 ? 8 : 3

    const score = Math.min(100, base + speedPenalty + accuracyPenalty + complaintPenalty + agePenalty + index * 2)
    const riskLevel = toRiskLevel(score)

    const drivers = [
      speedPenalty > 0 ? "Drive-thru speed above target" : "Service speed stable",
      accuracyPenalty > 0 ? "Order accuracy below target" : "Order accuracy near target",
      complaintPenalty > 4 ? "Complaint rate elevated" : "Complaint rate stable",
    ]

    return {
      storeId: store.id,
      riskScore: score,
      riskLevel,
      drivers,
      recommendedAction:
        riskLevel === "critical" || riskLevel === "high"
          ? "Review labor deployment and peak-hour execution within 72 hours."
          : "Continue weekly monitoring and preserve current operating plan.",
    }
  })
}
