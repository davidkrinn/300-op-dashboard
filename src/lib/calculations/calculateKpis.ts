import { customerExperience } from "@/data/mockCustomerExperience"
import { financeSummary } from "@/data/mockFinance"
import { monthlySales } from "@/data/mockSales"
import { operationsKpis } from "@/data/mockOperations"
import { calculateYearOverYearChange } from "@/lib/calculations/calculateYearOverYearChange"
import type { KpiCard, KpiStatus } from "@/types/kpi"

function statusFromChange(change: number): KpiStatus {
  if (change > 2) return "positive"
  if (change >= -1) return "neutral"
  if (change >= -4) return "warning"
  return "critical"
}

export function calculateKpis(): KpiCard[] {
  const latest = monthlySales[monthlySales.length - 1]
  const prior = monthlySales[monthlySales.length - 2]
  const yoyBaseline = latest.netSales - 2.3
  const labor = operationsKpis.find((item) => item.metric === "Labor Cost %")
  const latestCx = customerExperience[customerExperience.length - 1]

  const salesChange = calculateYearOverYearChange(latest.netSales, prior.netSales)
  const ticketChange = calculateYearOverYearChange(latest.avgTicket, prior.avgTicket)
  const ordersChange = calculateYearOverYearChange(latest.transactions, prior.transactions)

  return [
    {
      id: "gross-sales",
      label: "Gross Sales",
      value: latest.netSales,
      previousPeriodChange: salesChange,
      yearOverYearChange: calculateYearOverYearChange(latest.netSales, yoyBaseline),
      status: statusFromChange(salesChange),
      format: "currency",
    },
    {
      id: "avg-ticket",
      label: "Average Ticket",
      value: latest.avgTicket,
      previousPeriodChange: ticketChange,
      yearOverYearChange: 4.1,
      status: statusFromChange(ticketChange),
      format: "currency",
    },
    {
      id: "same-store-sales-growth",
      label: "Same Store Sales Growth",
      value: latest.compSalesPct,
      previousPeriodChange: latest.compSalesPct - prior.compSalesPct,
      yearOverYearChange: 1.7,
      status: statusFromChange(latest.compSalesPct - prior.compSalesPct),
      format: "percent",
    },
    {
      id: "total-orders",
      label: "Total Orders",
      value: latest.transactions,
      previousPeriodChange: ordersChange,
      yearOverYearChange: 2.8,
      status: statusFromChange(ordersChange),
      format: "number",
    },
    {
      id: "labor-percent",
      label: "Labor %",
      value: labor?.value ?? 0,
      previousPeriodChange: -0.2,
      yearOverYearChange: -0.6,
      status: (labor?.value ?? 0) <= (labor?.target ?? 0) ? "positive" : "warning",
      format: "percent",
    },
    {
      id: "ebitda",
      label: "EBITDA",
      value: financeSummary.ebitdaMtd,
      previousPeriodChange: 2.3,
      yearOverYearChange: 5.2,
      status: "positive",
      format: "currency",
    },
    {
      id: "complaint-rate",
      label: "Complaint Rate",
      value: latestCx.complaintRatePct,
      previousPeriodChange: latestCx.complaintRatePct - customerExperience[customerExperience.length - 2].complaintRatePct,
      yearOverYearChange: -0.4,
      status: latestCx.complaintRatePct <= 1.5 ? "positive" : "warning",
      format: "percent",
    },
    {
      id: "cash-on-hand",
      label: "Cash on Hand",
      value: financeSummary.cashOnHand,
      previousPeriodChange: 1.1,
      yearOverYearChange: 3.4,
      status: "positive",
      format: "currency",
    },
  ]
}
