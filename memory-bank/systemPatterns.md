# System Patterns

## System Overview

The dashboard should be implemented as a modular, insight-led web application.

The architecture should separate:

- Domain types and contracts
- Mock data sources
- Calculation and scoring logic
- Insight generation and ranking
- Data filtering and transformation
- Presentation components and page composition

This keeps the prototype maintainable and makes iterative AI-assisted development safer.

## Architecture Principles

1. Keep business logic out of React rendering components.
2. Compute metrics and insights in reusable library functions.
3. Keep mock data stable and deterministic for predictable outputs.
4. Pass prepared data down through component props.
5. Favor small, focused components over large page-level monoliths.

## Recommended Application Structure

```text
src/
├── app/
│   ├── page.tsx
│   ├── regional/
│   │   └── page.tsx
│   ├── stores/
│   │   └── [storeId]/
│   │       └── page.tsx
│   └── insights/
│       └── page.tsx
├── components/
│   ├── charts/
│   ├── dashboard/
│   ├── filters/
│   ├── insights/
│   ├── kpi/
│   ├── layout/
│   ├── maps/
│   ├── regional/
│   ├── stores/
│   └── ui/
├── data/
│   ├── mockStorePortfolio.ts
│   ├── mockStores.ts
│   ├── mockSales.ts
│   ├── mockOrders.ts
│   ├── mockOperations.ts
│   ├── mockCustomerExperience.ts
│   ├── mockFinance.ts
│   ├── mockEvents.ts
│   ├── mockWeather.ts
│   ├── mockInsights.ts
│   └── mockChannelMix.ts
├── lib/
│   ├── calculations/
│   │   ├── calculateKpis.ts
│   │   ├── calculateStoreRisk.ts
│   │   ├── calculateChannelMix.ts
│   │   ├── calculateStatePerformance.ts
│   │   ├── calculateBrandPerformance.ts
│   │   ├── calculateYearOverYearChange.ts
│   │   ├── calculateRegionalHealth.ts
│   │   └── calculatePeakTimes.ts
│   ├── insights/
│   │   ├── generateInsights.ts
│   │   ├── generatePerformanceInsights.ts
│   │   ├── generateRiskInsights.ts
│   │   ├── generateOpportunityInsights.ts
│   │   ├── generateForecastInsights.ts
│   │   └── rankInsights.ts
│   ├── filters/
│   ├── formatters/
│   │   └── formatValues.ts
│   ├── designTokens.ts
│   └── utils.ts
└── types/
	├── brand.ts
	├── channel.ts
	├── filters.ts
	├── insights.ts
	├── kpi.ts
	├── region.ts
	├── store.ts
	└── time.ts
```

## Layer Responsibilities

### 1) Types Layer

Defines source-of-truth contracts for all entities used by calculations and components.

### 2) Data Layer

Provides deterministic local mock datasets that mirror expected production concepts.

### 3) Calculation Layer

Transforms raw records into:

- KPI cards
- Time-series views
- Risk scores
- State and brand summaries
- Channel and peak-time analyses

### 4) Insights Layer

Generates performance, risk, opportunity, and forecast insights from calculated signals.

### 5) UI Layer

Renders prioritized insight-first executive experiences and role-based drilldowns.

## Page Composition Patterns

### Executive Homepage

- Global filters
- Morning brief
- Priority insights
- KPI grid
- Risk and opportunity summary
- Map and trend sections
- Recommended actions

### Regional Page

- Regional health and risk
- Cost and operations exceptions
- Customer signal trends
- Demand drivers and action plan

### Store Detail Page

- Store profile
- KPI and trend diagnostics
- Risk drivers
- Recommended actions

### Insights Page

- Ranked insight feed
- Type/priority/state/brand filters
- Explainability details and related metrics

## Data and Logic Flow Pattern

The implementation should follow this sequence:

1. Read local mock sources.
2. Normalize records to typed models.
3. Apply active filters.
4. Run KPI and risk calculations.
5. Generate deterministic insights.
6. Rank insights by urgency and impact.
7. Render insight-first UI with drilldowns.

## State and Filter Pattern

- Keep filter state in top-level page components first.
- Pass filtered datasets or active filter params to children.
- Reuse shared filter utilities in lib/filters.
- Introduce global state only when cross-page coupling requires it.

## Insight Pattern

Insights must include:

- What changed
- Where it changed
- Why it may have changed
- Why it matters
- Recommended next action

Insights should use deterministic rules for the prototype, not runtime LLM calls.

## Reuse and Naming Pattern

- Name components by role and intent, not layout position.
- Keep one primary responsibility per component.
- Prefer explicit names for calculation and insight functions.
- Keep data exports stable and predictable for downstream usage.

## Testing and Validation Pattern

- Validate calculation functions with deterministic inputs.
- Validate risk thresholds and insight ranking order.
- Validate filter behavior across state/brand/store/time/channel/risk dimensions.
- Validate key pages for responsive behavior and basic accessibility.