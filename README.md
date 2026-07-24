# 300-op-dashboard

Insight-led Restaurant Franchise Executive Dashboard prototype built with Next.js, TypeScript, Tailwind CSS, and Recharts.

## Run Locally

1. Install dependencies:

```bash
npm install --cache .npm-cache
```

2. Start development server:

```bash
npm run dev
```

3. Open:

```text
http://localhost:3000
```

## Routes

- `/`: Executive dashboard homepage
- `/regional`: Regional Manager deep dive
- `/insights`: Insights center
- `/stores/[storeId]`: Store-level view (example: `/stores/MN-TB-001`)

## Architecture Highlights

- Mock data modules in `src/data`
- Typed models in `src/types`
- Calculations in `src/lib/calculations`
- Deterministic insights engine in `src/lib/insights`
- App Router pages in `src/app`
- Feature components in `src/components`

## Validation

Production build succeeds:

```bash
npm run build
```
# Restaurant Franchise Executive Dashboard

## Overview

This project is a prototype for a modern, interactive executive dashboard designed for a hypothetical franchise ownership group (Taco Hut Enterprises) operating Taco Bell and Pizza Hut restaurants across Minnesota, Wisconsin, Iowa, South Dakota, and North Dakota.

The dashboard is intended to help leadership quickly understand business performance, identify operational risks, discover regional opportunities, and reduce the time currently spent digging through spreadsheets.

A good dashboard should not simply display data. It should help users act. This product is designed around the question:

> What does the ownership group need to know this morning to make better decisions today?

## Audience

The primary audience is the franchise ownership group and executive leadership team, including:

- Franchise group owners
- Regional managers
- Operations leads
- Finance leads
- Legal leads
- Real estate leads

The dashboard will begin as a shared executive view for all users. Future deep-dive experiences may be tailored by role. This prototype includes a deeper Regional Manager perspective as an example.

## Business Goals

The dashboard should help users quickly understand:

- Cost management performance
- Sales increases and decreases
- Stores at risk
- Regional opportunities
- Operational issues before they become larger problems

The main success measure is reducing time spent analyzing spreadsheets and helping leaders move from data review to decision-making faster.

## Restaurant Portfolio

The hypothetical store footprint includes Taco Bell and Pizza Hut locations across five states.

| State | Taco Bell Stores | Pizza Hut Stores | Total Stores |
|---|---:|---:|---:|
| Minnesota | 100 | 90 | 190 |
| Wisconsin | 85 | 70 | 155 |
| Iowa | 87 | 69 | 156 |
| South Dakota | 60 | 50 | 110 |
| North Dakota | 55 | 58 | 113 |
| **Total** | **387** | **337** | **724** |

## Core Comparisons

Users should be able to compare performance across:

- Store vs. store
- Store vs. region
- Taco Bell vs. Pizza Hut
- State vs. state
- Year-over-year performance

## Key Dashboard Capabilities

The dashboard should provide:

- Executive KPI snapshot
- AI-generated daily insights
- Sales and order trends
- Cost management indicators
- Store risk detection
- Regional opportunity identification
- Brand comparison between Taco Bell and Pizza Hut
- Interactive regional map
- Store clustering
- Heat maps
- Drilldowns for deeper analysis
- Regional Manager deep-dive example

## Priority KPIs

### Sales

- Gross Sales
- Average Ticket
- Same Store Sales Growth

### Orders

- Total Orders
- Orders Per Hour
- Orders Per Day

### Operations

- Drive-thru Speed
- Order Accuracy
- Labor %
- Food Cost %

### Customer Experience

- Complaint Volume
- App Ratings

### Finance

- EBITDA
- Revenue per Location

## Hypothetical Data Sources

This prototype assumes data may come from:

- POS systems
- Taco Bell corporate feeds
- Pizza Hut corporate feeds
- Delivery platforms
  - DoorDash
  - Uber Eats
  - Grubhub
- Labor scheduling systems
- Weather services
- Sports and event calendars
- Financial systems

## Design Direction

The visual style should feel like a high-end consulting dashboard:

- Modern
- Fresh
- Colorful
- Clear
- Executive-ready
- Insight-led
- Highly interactive
- Easy to scan in under 60 seconds

The preferred dashboard opening experience is:

> AI Insights First

The dashboard should lead with what matters today, not just raw charts.

## Prototype Scope

This project represents a full product concept, including:

- Executive homepage
- Regional view
- Store-level view
- Insights center
- Forecasting
- Alerts
- Mobile-responsive experience
- Example Regional Manager deep dive

## Suggested Tech Stack

The prototype assumes the following stack:

- React
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Recharts or D3
- Mock data layer
- AI-powered insight generation layer

## Project Status

This is a hypothetical prototype intended for design exploration, product strategy, and dashboard experience development.