import { CategoriesRadialChart } from "@/components/categories-radial-chart";
import { TestSectionCards } from "@/components/cards-test";
import { MonthProgressChart } from "@/components/month-progress-chart";
import { ChartPieSavingsByCategory } from "@/components/pie-chart-interative";

const monthProgressChartData = [
  { date: "1 - 8 May", savings: 600 },
  { date: "8 - 15 May", savings: 450 },
  { date: "15 - 22 May", savings: 1000 },
  { date: "22 - 29 May", savings: 850 },
  { date: "29 - 31 May", savings: 0 },
];

const categoriesRadialChartData = [
  { category: "salary", balance: 310, fill: "var(--theme-100)" },
  { category: "ifood", balance: 310, fill: "var(--theme-100)" },
  { category: "sports", balance: 200, fill: "var(--theme-200)" },
  { category: "uber", balance: 150, fill: "var(--theme-300)" },
  { category: "school", balance: 100, fill: "var(--theme-500)" },
];

export default async function DashboardPage() {
  // await getWallet();

  return (
    <div className="@container/main flex min-h-0 flex-1 flex-col">
      <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-4 gap-4 p-4 md:p-6 lg:grid-cols-12 lg:grid-rows-2">
        <section className="min-h-0 overflow-hidden lg:col-span-7 lg:row-start-1">
          <TestSectionCards />
        </section>

        <section className="min-h-0 overflow-hidden lg:col-span-12 lg:row-start-2">
          <MonthProgressChart />
        </section>

        <section className="min-h-0 lg:col-span-5 lg:row-start-1 lg:min-h-0">
          <ChartPieSavingsByCategory />
        </section>
      </div>
    </div>
  );
}
