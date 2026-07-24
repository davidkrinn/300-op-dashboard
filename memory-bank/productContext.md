# Product Context

## Product Vision

The Restaurant Franchise Executive Dashboard is designed to be the morning command center for a large multi-state restaurant franchise ownership group.

Instead of forcing leaders to open spreadsheets, pull reports, compare numbers manually, or ask multiple teams for updates, the dashboard should surface the most important business signals automatically.

The experience should feel like a high-end consulting dashboard: polished, strategic, visual, and action-oriented.

## Product Philosophy

A good dashboard does not just show data.

A good dashboard helps someone act.

This dashboard should answer:

- What should I pay attention to?
- What changed since yesterday, last week, last month, or last year?
- Why might this be happening?
- Which stores or regions need support?
- Where are we seeing upside?
- What actions should leaders consider?

## Target Audience

The executive dashboard is shared across the ownership group and related leadership functions.

### Core Audience Groups

| Audience | Primary Need |
|---|---|
| Franchise Owners | Understand enterprise-wide health, financial performance, risk, and opportunity |
| Regional Managers | Identify store-level issues, coaching needs, and regional patterns |
| Operations Leads | Monitor service speed, accuracy, order flow, and execution |
| Finance Leads | Track sales, costs, EBITDA, and revenue per location |
| Legal Leads | Monitor potential compliance patterns or risk indicators |
| Real Estate Leads | Understand location performance and regional growth opportunities |

## Experience Model

The initial product should use one shared executive dashboard for all users.

Future versions may include role-specific deep dives. For this prototype, the Regional Manager deep dive should be included as an example of how a shared executive dashboard can branch into a more operational view.

## Executive Dashboard User Journey

### 1. Open Dashboard

The user starts with a daily AI-generated summary of what matters.

The top of the dashboard should answer:

- What changed?
- What is at risk?
- What is performing well?
- What needs follow-up?

### 2. Review KPI Snapshot

The user scans core KPIs:

- Gross Sales
- Average Ticket
- Same Store Sales Growth
- Total Orders
- Labor %
- Food Cost %
- EBITDA
- Revenue per Location
- Complaint Volume
- App Ratings

### 3. Explore by Geography

The user views performance across:

- Minnesota
- Wisconsin
- Iowa
- South Dakota
- North Dakota

The map should support:

- Interactive regional map
- Heat maps
- Store clustering
- State filtering
- Brand filtering
- Store-level drilldowns

### 4. Compare Performance

The user can compare:

- Store vs. store
- Store vs. region
- State vs. state
- Taco Bell vs. Pizza Hut
- Current period vs. prior year

### 5. Investigate Drivers

The dashboard should help explain performance movement using contextual signals such as:

- Regional events
- Sports games
- Weather
- Delivery platform mix
- Store traffic patterns
- Drive-thru volume
- Labor cost changes

### 6. Take Action

The user should be guided toward action through:

- Alerts
- Recommended focus areas
- Prioritized risk lists
- Opportunity callouts
- Store-level recommendations
- Regional Manager deep dives

## Dashboard Information Architecture

### Level 1: Executive Homepage

Purpose: Provide a quick snapshot of overall franchise performance.

Recommended sections:

1. AI-generated morning brief
2. Cross-state KPI summary
3. Brand performance comparison
4. Store risk summary
5. Regional opportunity highlights
6. Sales and order trend overview
7. Channel mix analysis
8. Interactive map
9. Alerts and recommended actions

### Level 2: Regional View

Purpose: Show performance for a selected state or region.

Recommended sections:

1. Regional KPI summary
2. Regional sales trend
3. Store cluster map
4. Top-performing stores
5. Underperforming stores
6. Cost management overview
7. Labor and food cost variance
8. Delivery, drive-thru, in-store, and app mix
9. Event and weather correlation insights

### Level 3: Store-Level View

Purpose: Let users inspect a single restaurant location.

Recommended sections:

1. Store profile
2. Sales performance
3. Order volume
4. Average ticket
5. Drive-thru speed
6. Order accuracy
7. Labor %
8. Food cost %
9. Customer complaints
10. App ratings
11. Channel mix
12. Historical trend
13. Recommended actions

### Level 4: Insights Center

Purpose: Centralize AI-generated insights and explainability.

Recommended sections:

1. Performance insights
2. Risk insights
3. Opportunity insights
4. Forecast insights
5. Store anomaly detection
6. Event/weather correlations
7. Suggested follow-ups

### Level 5: Forecasting

Purpose: Help leadership anticipate performance.

Recommended sections:

1. Sales forecast
2. Order forecast
3. Labor risk forecast
4. Weather/event impact
5. Brand-level outlook
6. State-level outlook
7. Store-level risk projections

## Regional Manager Deep Dive

The Regional Manager deep dive should focus on operational action.

### Regional Manager Jobs to Be Done

Regional managers need to know:

- Which stores need attention?
- Which stores are improving?
- Which stores are slipping?
- Are labor or food costs above target?
- Are customer complaints increasing?
- Are drive-thru times getting worse?
- Is a regional event likely to increase demand?
- Which store managers need follow-up?

### Regional Manager View Sections

1. Regional health score
2. Stores at risk
3. Stores outperforming forecast
4. Cost variance by store
5. Labor % exceptions
6. Food cost % exceptions
7. Drive-thru speed issues
8. Complaint volume spikes
9. Order accuracy issues
10. Recommended store visits
11. Suggested coaching priorities
12. Upcoming demand drivers

### Example Regional Manager Insight Cards

#### Store Risk

"Store MN-042 has declining same store sales, rising labor %, and increased complaints over the past 14 days."

#### Labor Cost Alert

"Eight Wisconsin stores exceeded labor target this week, with three stores above target for three consecutive periods."

#### Coaching Opportunity

"Pizza Hut stores in Iowa show strong average ticket growth but lower order accuracy during evening peak."

#### Demand Forecast

"North Dakota stores near upcoming regional sports events are projected to see higher evening order volume this weekend."

## Visual Design Direction

The product should feel:

- Modern
- Fresh
- Colorful
- Polished
- Strategic
- Executive
- Clear
- Consultative

Preferred style:

> High-end consulting dashboard

The dashboard should balance polish with usability. It should look impressive, but not become visually overwhelming.

## Color and Visual System

Recommended visual themes:

- Bright but controlled color palette
- Brand-aware accents for Taco Bell and Pizza Hut
- Neutral executive background
- Clear status colors
- Data visualization colors that support comparison
- Map overlays that are readable and not overly saturated

### Suggested Color Roles

| Role | Purpose |
|---|---|
| Purple Accent | Taco Bell-related highlights |
| Red Accent | Pizza Hut-related highlights |
| Green | Positive performance |
| Amber | Watchlist or caution |
| Red | Risk or underperformance |
| Blue | Neutral operational insight |
| Gray | Baseline, comparison, or inactive state |

## Interaction Principles

Users should be able to:

- Filter by state
- Filter by brand
- Filter by store
- Filter by time period
- Filter by channel
- Filter by risk level
- Hover for explanations
- Click into deep dives
- Compare states and brands
- View trend explanations
- Expand AI insights
- Drill from enterprise to region to store

## Channel Mix Categories

The dashboard should track sales and orders by:

- App delivery
- Driver delivery
- In-store
- Drive-thru

These should be available as both:

- KPI filters
- Trend breakdowns
- Comparative visualizations

## AI Insight Requirements

Insights should be:

- Clear
- Brief
- Actionable
- Explainable
- Prioritized
- Connected to underlying data

Each insight should include:

- Insight type
- Short headline
- Explanation
- Related stores or regions
- Confidence level
- Suggested action
- Supporting metrics

## Insight Types

### Performance Insight

Identifies positive or negative movement in sales, orders, average ticket, or same store sales growth.

### Risk Insight

Flags stores, regions, or brands with concerning patterns.

### Opportunity Insight

Identifies favorable conditions or emerging upside.

### Forecast Insight

Projects expected movement based on trends, events, weather, or previous performance patterns.

## Product Experience Goal

The dashboard should make the user's morning easier by turning scattered operational and financial signals into a clear, prioritized view of what matters most.
# Product Context

## Product Vision

The Restaurant Franchise Executive Dashboard is designed to be the morning command center for a large multi-state restaurant franchise ownership group.

Instead of forcing leaders to open spreadsheets, pull reports, compare numbers manually, or ask multiple teams for updates, the dashboard should surface the most important business signals automatically.

The experience should feel like a high-end consulting dashboard: polished, strategic, visual, and action-oriented.

## Product Philosophy

A good dashboard does not just show data.

A good dashboard helps someone act.

This dashboard should answer:

- What should I pay attention to?
- What changed since yesterday, last week, last month, or last year?
- Why might this be happening?
- Which stores or regions need support?
- Where are we seeing upside?
- What actions should leaders consider?

## Target Audience

The executive dashboard is shared across the ownership group and related leadership functions.

### Core Audience Groups

| Audience | Primary Need |
|---|---|
| Franchise Owners | Understand enterprise-wide health, financial performance, risk, and opportunity |
| Regional Managers | Identify store-level issues, coaching needs, and regional patterns |
| Operations Leads | Monitor service speed, accuracy, order flow, and execution |
| Finance Leads | Track sales, costs, EBITDA, and revenue per location |
| Legal Leads | Monitor potential compliance patterns or risk indicators |
| Real Estate Leads | Understand location performance and regional growth opportunities |

## Experience Model

The initial product should use one shared executive dashboard for all users.

Future versions may include role-specific deep dives. For this prototype, the Regional Manager deep dive should be included as an example of how a shared executive dashboard can branch into a more operational view.

## Executive Dashboard User Journey

### 1. Open Dashboard

The user starts with a daily AI-generated summary of what matters.

The top of the dashboard should answer:

- What changed?
- What is at risk?
- What is performing well?
- What needs follow-up?

### 2. Review KPI Snapshot

The user scans core KPIs:

- Gross Sales
- Average Ticket
- Same Store Sales Growth
- Total Orders
- Labor %
- Food Cost %
- EBITDA
- Revenue per Location
- Complaint Volume
- App Ratings

### 3. Explore by Geography

The user views performance across:

- Minnesota
- Wisconsin
- Iowa
- South Dakota
- North Dakota

The map should support:

- Interactive regional map
- Heat maps
- Store clustering
- State filtering
- Brand filtering
- Store-level drilldowns

### 4. Compare Performance

The user can compare:

- Store vs. store
- Store vs. region
- State vs. state
- Taco Bell vs. Pizza Hut
- Current period vs. prior year

### 5. Investigate Drivers

The dashboard should help explain performance movement using contextual signals such as:

- Regional events
- Sports games
- Weather
- Delivery platform mix
- Store traffic patterns
- Drive-thru volume
- Labor cost changes

### 6. Take Action

The user should be guided toward action through:

- Alerts
- Recommended focus areas
- Prioritized risk lists
- Opportunity callouts
- Store-level recommendations
- Regional Manager deep dives

## Dashboard Information Architecture

### Level 1: Executive Homepage

Purpose: Provide a quick snapshot of overall franchise performance.

Recommended sections:

1. AI-generated morning brief
2. Cross-state KPI summary
3. Brand performance comparison
4. Store risk summary
5. Regional opportunity highlights
6. Sales and order trend overview
7. Channel mix analysis
8. Interactive map
9. Alerts and recommended actions

### Level 2: Regional View

Purpose: Show performance for a selected state or region.

Recommended sections:

1. Regional KPI summary
2. Regional sales trend
3. Store cluster map
4. Top-performing stores
5. Underperforming stores
6. Cost management overview
7. Labor and food cost variance
8. Delivery, drive-thru, in-store, and app mix
9. Event and weather correlation insights

### Level 3: Store-Level View

Purpose: Let users inspect a single restaurant location.

Recommended sections:

1. Store profile
2. Sales performance
3. Order volume
4. Average ticket
5. Drive-thru speed
6. Order accuracy
7. Labor %
8. Food cost %
9. Customer complaints
10. App ratings
11. Channel mix
12. Historical trend
13. Recommended actions

### Level 4: Insights Center

Purpose: Centralize AI-generated insights and explainability.

Recommended sections:

1. Performance insights
2. Risk insights
3. Opportunity insights
4. Forecast insights
5. Store anomaly detection
6. Event/weather correlations
7. Suggested follow-ups

### Level 5: Forecasting

Purpose: Help leadership anticipate performance.

Recommended sections:

1. Sales forecast
2. Order forecast
3. Labor risk forecast
4. Weather/event impact
5. Brand-level outlook
6. State-level outlook
7. Store-level risk projections

## Regional Manager Deep Dive

The Regional Manager deep dive should focus on operational action.

### Regional Manager Jobs to Be Done

Regional managers need to know:

- Which stores need attention?
- Which stores are improving?
- Which stores are slipping?
- Are labor or food costs above target?
- Are customer complaints increasing?
- Are drive-thru times getting worse?
- Is a regional event likely to increase demand?
- Which store managers need follow-up?

### Regional Manager View Sections

1. Regional health score
2. Stores at risk
3. Stores outperforming forecast
4. Cost variance by store
5. Labor % exceptions
6. Food cost % exceptions
7. Drive-thru speed issues
8. Complaint volume spikes
9. Order accuracy issues
10. Recommended store visits
11. Suggested coaching priorities
12. Upcoming demand drivers

### Example Regional Manager Insight Cards

#### Store Risk

“Store MN-042 has declining same store sales, rising labor %, and increased complaints over the past 14 days.”

#### Labor Cost Alert

“Eight Wisconsin stores exceeded labor target this week, with three stores above target for three consecutive periods.”

#### Coaching Opportunity

“Pizza Hut stores in Iowa show strong average ticket growth but lower order accuracy during evening peak.”

#### Demand Forecast

“North Dakota stores near upcoming regional sports events are projected to see higher evening order volume this weekend.”

## Visual Design Direction

The product should feel:

- Modern
- Fresh
- Colorful
- Polished
- Strategic
- Executive
- Clear
- Consultative

Preferred style:

> High-end consulting dashboard

The dashboard should balance polish with usability. It should look impressive, but not become visually overwhelming.

## Color and Visual System

Recommended visual themes:

- Bright but controlled color palette
- Brand-aware accents for Taco Bell and Pizza Hut
- Neutral executive background
- Clear status colors
- Data visualization colors that support comparison
- Map overlays that are readable and not overly saturated

### Suggested Color Roles

| Role | Purpose |
|---|---|
| Purple Accent | Taco Bell-related highlights |
| Red Accent | Pizza Hut-related highlights |
| Green | Positive performance |
| Amber | Watchlist or caution |
| Red | Risk or underperformance |
| Blue | Neutral operational insight |
| Gray | Baseline, comparison, or inactive state |

## Interaction Principles

Users should be able to:

- Filter by state
- Filter by brand
- Filter by store
- Filter by time period
- Filter by channel
- Filter by risk level
- Hover for explanations
- Click into deep dives
- Compare states and brands
- View trend explanations
- Expand AI insights
- Drill from enterprise to region to store

## Channel Mix Categories

The dashboard should track sales and orders by:

- App delivery
- Driver delivery
- In-store
- Drive-thru

These should be available as both:

- KPI filters
- Trend breakdowns
- Comparative visualizations

## AI Insight Requirements

Insights should be:

- Clear
- Brief
- Actionable
- Explainable
- Prioritized
- Connected to underlying data

Each insight should include:

- Insight type
- Short headline
- Explanation
- Related stores or regions
- Confidence level
- Suggested action
- Supporting metrics

## Insight Types

### Performance Insight

Identifies positive or negative movement in sales, orders, average ticket, or same store sales growth.

### Risk Insight

Flags stores, regions, or brands with concerning patterns.

### Opportunity Insight

Identifies favorable conditions or emerging upside.

### Forecast Insight

Projects expected movement based on trends, events, weather, or previous performance patterns.

## Product Experience Goal

The dashboard should make the user's morning easier by turning scattered operational and financial signals into a clear, prioritized view of what matters most.