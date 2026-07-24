import { eventsCalendar } from "@/data/mockEvents"
import { weatherOutlook } from "@/data/mockWeather"
import type { StateName } from "@/types/region"
import type { Insight } from "@/types/insights"

export function generateOpportunityInsights(): Insight[] {
  const bestEvent = [...eventsCalendar].sort((a, b) => b.expectedTrafficLiftPct - a.expectedTrafficLiftPct)[0]
  const bestWeather = [...weatherOutlook].sort((a, b) => b.expectedSalesImpactPct - a.expectedSalesImpactPct)[0]

  return [
    {
      id: "opp-event-demand",
      type: "opportunity",
      priority: "high",
      headline: `${bestEvent.market} event window could lift traffic ${bestEvent.expectedTrafficLiftPct}%`,
      summary: `The ${bestEvent.event} period projects a meaningful order upside.`,
      explanation: "Recent event-driven periods in comparable markets produced concentrated dinner demand increases.",
      recommendedAction: "Pre-position labor and inventory at nearby high-volume stores for peak windows.",
      affectedState: bestEvent.market as StateName,
      confidence: "medium",
      relatedMetrics: ["Event Traffic Lift", "Orders Per Hour"],
    },
    {
      id: "opp-weather-demand",
      type: "opportunity",
      priority: "medium",
      headline: `${bestWeather.market} weather setup favors order growth`,
      summary: "Forecasted weather pattern aligns with prior drive-thru demand gains.",
      explanation: "Comparable weather windows historically shifted order mix toward convenient channels.",
      recommendedAction: "Prepare drive-thru staffing and digital pickup readiness for evening periods.",
      affectedState: bestWeather.market as StateName,
      confidence: "medium",
      relatedMetrics: ["Expected Sales Impact", "Channel Mix"],
    },
  ]
}
