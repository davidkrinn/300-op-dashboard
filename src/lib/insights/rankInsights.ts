import type { Insight } from "@/types/insights"

const priorityScore = {
  high: 3,
  medium: 2,
  low: 1,
} as const

const confidenceScore = {
  high: 3,
  medium: 2,
  low: 1,
} as const

export function rankInsights(insights: Insight[]): Insight[] {
  return [...insights].sort((a, b) => {
    const priorityDelta = priorityScore[b.priority] - priorityScore[a.priority]
    if (priorityDelta !== 0) return priorityDelta

    const confidenceDelta = confidenceScore[b.confidence] - confidenceScore[a.confidence]
    if (confidenceDelta !== 0) return confidenceDelta

    return a.headline.localeCompare(b.headline)
  })
}
