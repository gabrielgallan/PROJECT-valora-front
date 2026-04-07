import { CategorySavings } from "@/components/dashboard/categories-pie-chart-int";
import { DashboardPageClient, KPIDataSource } from "./client";
import { SavingsChartData } from "@/components/dashboard/savings-chart-int";
import { getYearSavingsProgress } from "@/strategies/get-year-savings-progress";
import { getWallet } from "@/strategies/get-wallet";
import { HTTPGetWalletInfo } from "@/http/get-wallet-info";
import { HTTPGetYearProgress } from "@/http/get-year-progress";
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

function generateCategoriessavingsMockData(count = 1): CategorySavings[] {
  const categories = [
    "Food",
    "Uber",
    "Rent",
    "Gym",
    "Streaming",
    "Shopping",
    "Health",
    "Travel",
    "Education",
    "Bills",
  ]

  return Array.from({ length: count }).map((_, index) => {
    const name = categories[index % categories.length]

    return {
      category: name,
      slug: name.toLowerCase(),
      savings: Number((Math.random() * 1000 + 50).toFixed(2)),
    }
  })
}

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
  const balanceReply = await HTTPGetWalletInfo()
  const progressReply = await HTTPGetYearProgress()

  const kpiData: KPIDataSource = {
    ...YearProgressMapper.toKpiCards(progressReply),
    balance: {
      total: balanceReply.wallet.balance
    }
  }

  const datas = {
    kpis: kpiData,
    savingsChart: YearProgressMapper.toSavingsChart(progressReply),
    categoriesSavings: generateCategoriessavingsMockData(),
  }

  return (
    <DashboardPageClient datas={datas} />
  )
}
