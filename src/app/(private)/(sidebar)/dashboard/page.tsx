import { DashboardPageClient, KPIDataSource } from "./client";
import { HTTPGetWalletInfo } from "@/http/get-wallet-info";
import { HTTPGetYearProgress } from "@/http/get-year-progress";
import { getCategoriesMetrics } from "@/strategies/get-categories-metrics";
import { YearProgressMapper } from "@/strategies/mappers/year-progress-mapper";

// function generateSavingsChartMockData(): SavingsChartData[] {
//   const dates = [
//     "April 2025",
//     "May 2025",
//     "June 2025",
//     "July 2025",
//     "August 2025",
//     "September 2025",
//     "October 2025",
//     "November 2025",
//     "December 2025",
//     "January 2026",
//     "February 2026",
//     "March 2026",
//   ]

//   return dates.map((date) => ({
//     date,
//     savings: Number((Math.random() * 600 + 400).toFixed(0)), // entre 400 e 1000
//   }))
// }

// const kpiMock: KPIDataSource = {
//     balance: {
//       total: 12850.75,
//     },
//     savingRate: {
//       value: 0.185,   // 18.5%
//       percent: 0.185, // 18.5%
//     },
//     income: {
//       total: 10000,
//       percent: 1,     // 100%
//     },
//     expense: {
//       total: 8150,
//       percent: 0.815, // 81.5%
//     },
//   }

export default async function DashboardPage() {
  const [balanceReply, progressReply, categoriesMetrics] = await Promise.all([
    HTTPGetWalletInfo(),
    HTTPGetYearProgress(),
    getCategoriesMetrics(),
  ])

  const kpiData: KPIDataSource = {
    ...YearProgressMapper.toKpiCards(progressReply),
    balance: {
      total: balanceReply.wallet.balance
    }
  }

  const datas = {
    kpis: kpiData,
    savingsChart: YearProgressMapper.toSavingsChart(progressReply),
    categoriesMetrics,
  }

  return (
    <DashboardPageClient datas={datas} />
  )
}
