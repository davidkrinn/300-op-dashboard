import { calculateStoreRisk } from "@/lib/calculations/calculateStoreRisk"
import { stores } from "@/data/mockStores"
import type { Insight } from "@/types/insights"
import type { Brand } from "@/types/brand"
import type { StateName } from "@/types/region"

export function generateRiskInsights(): Insight[] {
  const risks = calculateStoreRisk().filter((risk) => risk.riskLevel === "critical" || risk.riskLevel === "high")

  return risks.slice(0, 2).map((risk) => {
    const store = stores.find((item) => item.id === risk.storeId)

    return {
      id: `risk-${risk.storeId}`,
      type: "risk",
      priority: risk.riskLevel === "critical" ? "high" : "medium",
      headline: `${risk.storeId} showing elevated risk (${risk.riskScore})`,
      summary: "Multiple operating signals are outside acceptable thresholds.",
      explanation: risk.drivers.join("; "),
      recommendedAction: risk.recommendedAction,
      affectedBrand: store?.brand as Brand | undefined,
      affectedState: store?.state as StateName | undefined,
      affectedStores: [risk.storeId],
      confidence: "medium",
      relatedMetrics: ["Speed of Service", "Order Accuracy", "Complaint Rate"],
    }
  })
}
