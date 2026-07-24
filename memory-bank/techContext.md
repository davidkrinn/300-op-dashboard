# Tech Context

## Purpose of This File

This file defines the technical direction for the Restaurant Franchise Executive Dashboard prototype.

It should be used by developers and AI coding assistants as the source of truth for:

- Technology stack
- Project structure
- Architecture decisions
- Data modeling
- Component patterns
- Charting approach
- Mock data strategy
- Insight-generation logic
- Development sequence

The goal is to keep the prototype consistent as it evolves through VS Code, Copilot, and iterative prompts.

---

## Product Type

This project is a front-end prototype for a modern executive dashboard.

The prototype should demonstrate the experience of a dashboard used by a hypothetical franchise ownership group operating Taco Bell and Pizza Hut restaurants across:

- Minnesota
- Wisconsin
- Iowa
- South Dakota
- North Dakota

The dashboard should help users quickly understand:

- Cost management
- Sales performance
- Stores at risk
- Regional opportunities
- Operational trends
- Sales channel mix
- Event/weather-driven demand
- Forecasted business movement

---

## Technical Philosophy

This is not a basic reporting dashboard.

This is a decision-making dashboard.

The technical implementation should support the product principle:

> The dashboard should help users understand what changed, why it changed, and what action they should consider next.

Every major component should support one or more of these questions:

1. What changed?
2. Why did it change?
3. Where should I focus?
4. What should I do next?

If a component only displays data but does not help the user interpret or act on it, reconsider whether it belongs in the experience.

---

## Recommended Technology Stack

Use the following stack for the prototype:

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Recharts
- lucide-react
- Local mock data
- Deterministic insight-generation logic

Optional later additions:

- Zustand for more advanced state management
- D3 for advanced custom visualizations
- Mapbox or Leaflet for production-grade mapping
- Framer Motion for polished microinteractions

---

## Application Framework

Use Next.js with the App Router.

Recommended reasons:

- Strong React support
- File-based routing
- Clean page organization
- Works well with TypeScript
- Works well with Tailwind CSS
- Supports future API routes if needed
- Good fit for dashboard prototypes

---

## Language

Use TypeScript throughout the application.

Do not use plain JavaScript unless there is a strong reason.

TypeScript should be used for:

- Store data
- KPI definitions
- Insight objects
- Filter state
- Chart data
- Regional data
- Risk scoring
- Component props
- Utility functions

Strong typing is important because this dashboard has many related data objects and comparison views.

---

## Styling Approach

Use Tailwind CSS for styling.

Use shadcn/ui for reusable interface components.

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

The visual style should feel polished, modern, colorful, and executive-ready.

---

## Charting Approach

Use Recharts for most charts in the initial prototype.

Recharts is appropriate for:

- Line charts
- Bar charts
- Area charts
- Donut charts
- Stacked bar charts
- Sparkline-style KPI trends
- Simple comparative visualizations

Use D3 only if a visualization requires custom behavior that Recharts cannot handle easily.

Potential D3 use cases:

- Advanced heat maps
- Custom clustering
- Custom geographic overlays
- Highly customized interaction patterns

---

## Mapping Approach

For the first prototype, avoid over-engineering the map.

Start with one of these simpler approaches:

1. Clickable state cards styled as a regional map
2. Simplified Midwest region visualization
3. State-level heat map panel
4. Store cluster cards by state
5. Mock interactive map component

The initial goal is to demonstrate location intelligence, not to build a production GIS product.

The map experience should support:

- State-level performance
- Store clustering
- Risk concentration
- Sales heat intensity
- Brand filtering
- Store-level drilldown
- Regional comparison

Future version options:

- Mapbox
- Leaflet
- Google Maps API
- Azure Maps

---

## Recommended Project Structure

Use this structure:
Recommended Routes
/

Executive dashboard homepage.

This is the primary landing experience for all users.

It should include:

AI-style morning brief
Executive KPI snapshot
Cost management summary
Sales performance overview
Store risk summary
Regional opportunity highlights
Brand comparison
Channel mix
Interactive regional map
Alerts and recommended actions

/regional

Regional Manager deep-dive view.

This page demonstrates how the shared executive dashboard can branch into a more operational role-based experience.

It should include:

Regional health score
Stores at risk
Cost variance by store
Labor % exceptions
Food cost % exceptions
Drive-thru speed issues
Complaint and app rating trends
Recommended store visits
Suggested coaching priorities
Upcoming demand drivers

/stores/[storeId]

Store-level detail view.

It should include:

Store profile
Brand
State
Region
City
Sales performance
Order performance
Operational health
Customer experience metrics
Finance metrics
Risk score
Insight summary
Recommended action

/insights

Central insights page.

It should include:

Performance insights
Risk insights
Opportunity insights
Forecast insights
Filters by priority
Filters by state
Filters by brand
Expandable explanations
Related metrics
Recommended next steps

Core Data Sources

The prototype should assume hypothetical data from:

POS systems
Taco Bell corporate feeds
Pizza Hut corporate feeds
DoorDash
Uber Eats
Grubhub
Labor scheduling systems
Weather services
Sports and event calendars
Financial systems

For this prototype, all data should be mocked locally.