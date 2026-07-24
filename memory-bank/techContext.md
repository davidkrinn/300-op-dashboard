# Tech Context

## Purpose of This File

This file defines the technical direction for the Restaurant Franchise Executive Dashboard prototype.

Use this file as the technical source of truth for:

- Technology stack
- Project structure
- Architecture decisions
- Data modeling
- Component patterns
- Charting approach
- Mock data strategy
- Insight generation logic
- Development sequence

## Product Type

This is a front-end prototype for an executive dashboard used by a hypothetical ownership group operating Taco Bell and Pizza Hut stores in:

- Minnesota
- Wisconsin
- Iowa
- South Dakota
- North Dakota

The dashboard should help users understand cost management, sales movement, risk, opportunity, operational trends, channel mix, and event or weather demand effects.

## Technical Philosophy

This is a decision support dashboard, not a static reporting dashboard.

Each major component should help answer at least one of these questions:

1. What changed?
2. Why did it change?
3. Where should I focus?
4. What should I do next?

## Recommended Technology Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Recharts
- lucide-react
- Local TypeScript mock data
- Deterministic insight logic

Optional later additions:

- Zustand
- D3
- Mapbox or Leaflet
- Framer Motion

## Application Framework

Use Next.js App Router for page-level organization and future API route extensibility.

## Language

Use TypeScript throughout.

Type all:

- Store data
- KPI objects
- Insight objects
- Filter state
- Chart series
- Regional data
- Risk scoring
- Component props
- Utility inputs and outputs

## Styling Approach

- Tailwind CSS for layout and styling
- shadcn/ui for reusable primitives

Recommended shadcn/ui components:

- Card
- Button
- Badge
- Tabs
- Select
- Table
- Tooltip
- Sheet
- Dialog
- Separator
- Dropdown Menu
- Progress
- Scroll Area

## Charting Approach

Use Recharts for most charts:

- Line
- Bar
- Area
- Donut
- Stacked bar
- Sparkline trend

Use D3 only for advanced custom visuals that are difficult in Recharts.

## Mapping Approach

For v1, avoid production-grade GIS complexity. Start with one of:

1. Clickable state cards
2. Simplified Midwest panel
3. State heat map
4. Store cluster cards
5. Mock interactive map component

Map should support state performance, risk concentration, sales intensity, brand filtering, and drilldown behavior.

## Recommended Routes

### /

Executive dashboard homepage with:

- AI-style morning brief
- Executive KPI snapshot
- Cost and sales summary
- Store risk summary
- Regional opportunity highlights
- Brand comparison
- Channel mix
- Regional map panel
- Alerts and recommended actions

### /regional

Regional Manager deep dive with:

- Regional health score
- Stores at risk
- Cost variance by store
- Labor and food cost exceptions
- Drive-thru speed issues
- Complaint and app rating trends
- Recommended visits and coaching priorities
- Demand drivers

### /stores/[storeId]

Store detail view with:

- Store profile and location
- Sales and order performance
- Operational health
- Customer metrics
- Finance metrics
- Risk score and drivers
- Insight summary
- Recommended action

### /insights

Insights center with filters by priority, state, and brand plus expandable explainability and related metrics.

## Core Data Sources

Assume hypothetical data from:

- POS systems
- Brand corporate feeds
- Delivery platforms
- Labor systems
- Weather services
- Event calendars
- Financial systems

For the prototype, all data remains local and mocked.

## Mock Data Strategy

Store mock data in local TypeScript modules:

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

Mock data should enable state, brand, store, YoY, channel, risk, and forecast comparisons.

## Store Portfolio

Use:

- Minnesota: Taco Bell 100, Pizza Hut 90, Total 190
- Wisconsin: Taco Bell 85, Pizza Hut 70, Total 155
- Iowa: Taco Bell 87, Pizza Hut 69, Total 156
- South Dakota: Taco Bell 60, Pizza Hut 50, Total 110
- North Dakota: Taco Bell 55, Pizza Hut 58, Total 113

Totals:

- Taco Bell 387
- Pizza Hut 337
- Portfolio 724

## Core TypeScript Types

Recommended files under src/types:

- brand.ts
- channel.ts
- filters.ts
- insights.ts
- kpi.ts
- region.ts
- store.ts
- time.ts

Key unions and models:

- Brand: Taco Bell or Pizza Hut
- StateName: Minnesota | Wisconsin | Iowa | South Dakota | North Dakota
- SalesChannel: appDelivery | driverDelivery | inStore | driveThru
- RiskLevel: low | medium | high | critical
- InsightType: performance | risk | opportunity | forecast

## Calculation Layer

Keep business logic outside UI components.

Recommended folder:

- src/lib/calculations

Recommended files:

- calculateKpis.ts
- calculateStoreRisk.ts
- calculateChannelMix.ts
- calculateStatePerformance.ts
- calculateBrandPerformance.ts
- calculateYearOverYearChange.ts
- calculateRegionalHealth.ts
- calculatePeakTimes.ts

## Store Risk Calculation

Combine weak signals to generate risk score:

- Negative same store sales growth
- Labor percent above target
- Food cost percent above target
- Complaint spikes
- App rating decline
- Drive-thru speed issues
- Order accuracy decline
- EBITDA below target

Suggested bands:

- 0-24 low
- 25-49 medium
- 50-74 high
- 75-100 critical

## Insight Engine

Use deterministic logic for prototype insights (no live LLM dependency).

Recommended folder:

- src/lib/insights

Recommended files:

- generateInsights.ts
- generatePerformanceInsights.ts
- generateRiskInsights.ts
- generateOpportunityInsights.ts
- generateForecastInsights.ts
- rankInsights.ts

Ranking factors should include priority, impact, urgency, confidence, recency, and severity.

## Component Architecture

Recommended component groups:

- src/components/charts
- src/components/dashboard
- src/components/filters
- src/components/insights
- src/components/kpi
- src/components/layout
- src/components/maps
- src/components/regional
- src/components/stores
- src/components/ui

## Filter Pattern

Use top-level filter state on each dashboard page.

Core filters:

- State
- Brand
- Region
- Store
- Time period
- Sales channel
- Risk level

Start with React state. Introduce Zustand only if complexity requires shared, cross-page coordination.

## Formatting Utilities

Add reusable formatters in src/lib/formatters/formatValues.ts:

- formatCurrency
- formatPercent
- formatNumber
- formatDurationSeconds

## Design Tokens

Add src/lib/designTokens.ts for status colors, brand colors, and chart palette constants.

## Accessibility Guidelines

- Do not rely on color alone
- Maintain contrast
- Use semantic labels and clear button text
- Keep controls keyboard-friendly where practical
- Include chart titles and descriptions

## Responsiveness

Desktop-first with adaptive tablet and mobile priorities.

## Initial Dependency Suggestions

- npm install next react react-dom typescript
- npm install tailwindcss
- npm install recharts
- npm install lucide-react
- npm install clsx tailwind-merge class-variance-authority

If using shadcn/ui:

- npx shadcn@latest init
- npx shadcn@latest add card button badge tabs select table tooltip sheet dialog separator progress scroll-area dropdown-menu

## Recommended Build Sequence

1. Foundation and folder structure
2. Types and design tokens
3. Mock data
4. Executive shell and filters
5. Charts and comparisons
6. Insight engine and ranking
7. Risk and opportunity logic
8. Regional and store pages
9. Polish and responsiveness

## Development Rules

1. Keep components focused
2. Keep business logic out of React views
3. Use TypeScript consistently
4. Build against mock data first
5. Let insights drive user flow
6. Favor executive scanning and actionability

## Current Recommendation

Start with a polished, believable front-end prototype. Add live integrations, auth, and production forecasting only after the core experience proves useful.
