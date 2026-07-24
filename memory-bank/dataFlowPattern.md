# Data Flow Pattern

## Purpose

This file defines the end-to-end data flow used by the dashboard prototype.

Use this flow to keep implementation consistent across data modules, calculations, insight generation, and UI rendering.

## High-Level Flow

Mock Data Sources
      ↓
Normalization Layer
      ↓
Filter Application Layer
      ↓
Calculation Layer
      ↓
Risk Scoring Layer
      ↓
Insight Generation Layer
      ↓
Insight Ranking Layer
      ↓
UI Composition Layer
      ↓
User Drilldowns and Actions

## Stage-by-Stage Details

### 1) Mock Data Sources

Inputs:

- src/data/mockStorePortfolio.ts
- src/data/mockStores.ts
- src/data/mockSales.ts
- src/data/mockOrders.ts
- src/data/mockOperations.ts
- src/data/mockCustomerExperience.ts
- src/data/mockFinance.ts
- src/data/mockEvents.ts
- src/data/mockWeather.ts
- src/data/mockInsights.ts
- src/data/mockChannelMix.ts

Output:

- Raw in-memory records for each domain area.

### 2) Normalization Layer

Responsibilities:

- Enforce TypeScript contracts.
- Align field names and value types.
- Fill safe defaults for optional values when needed.

Output:

- Consistent typed domain objects ready for filtering and calculations.

### 3) Filter Application Layer

Active dimensions:

- State
- Brand
- Region
- Store
- Time period
- Channel
- Risk level

Responsibilities:

- Apply filter state in one place.
- Return filtered subsets for KPI, chart, and insight functions.

Output:

- Filtered, context-specific datasets.

### 4) Calculation Layer

Responsibilities:

- Build KPI cards and trends.
- Calculate brand/state comparisons.
- Calculate channel mix and peak times.
- Compute year-over-year movement.

Output:

- Derived metrics and chart-ready series.

### 5) Risk Scoring Layer

Signals considered:

- Same-store sales decline
- Labor percent above target
- Food cost percent above target
- Complaint spikes
- App rating declines
- Drive-thru speed deterioration
- Order accuracy declines
- EBITDA under target

Output:

- Store-level risk scores and risk levels.

### 6) Insight Generation Layer

Insight categories:

- Performance
- Risk
- Opportunity
- Forecast

Responsibilities:

- Detect meaningful changes and exceptions.
- Generate plain-language, action-oriented insights.
- Link insights to related stores, states, and metrics.

Output:

- Deterministic insight objects.

### 7) Insight Ranking Layer

Ranking factors:

- Priority
- Financial impact
- Customer impact
- Operational urgency
- Number of stores affected
- Confidence
- Recency and severity

Output:

- Ordered insight list for executive scanning.

### 8) UI Composition Layer

Responsibilities:

- Render morning brief first.
- Render priority insights and KPI snapshot.
- Render contextual charts, map, and comparison views.
- Render recommended actions and follow-up paths.

Output:

- Executive, regional, store, and insights page experiences.

### 9) User Drilldowns and Actions

Responsibilities:

- Support filter updates and detail navigation.
- Support region/store drilldowns.
- Preserve context as users navigate across pages.

Output:

- Fast, explainable decision support workflow.

## Implementation Rules

1. Keep calculations and insight logic outside UI components.
2. Keep all stage outputs deterministic for reproducible behavior.
3. Ensure each insight includes a recommended action.
4. Keep filter behavior consistent across all pages.
5. Prefer derived data pipelines over ad hoc in-component math.