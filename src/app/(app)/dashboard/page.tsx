import { CategoriesRadialChart } from "@/components/categories-radial-chart";
import { TestSectionCards } from "@/components/cards-test";
import { MonthProgressChart } from "@/components/month-progress-chart";
import { columns, Transaction } from "@/components/transactions-table/columns";
import { TransactionsTable } from "@/components/transactions-table/transactions-table";
import { getWallet } from "@/strategies/get-wallet";

async function getTransactions(): Promise<Transaction[]> {
  // TODO: replace mocked list with API request.
  return [
    {
      id: "728ed52f",
      title: "Salary",
      amount: 1800,
      date: new Date(2026, 2, 5),
      type: "income",
    },
    {
      id: "728ed52f",
      title: "Julia Payment",
      amount: 500,
      date: new Date(2026, 2, 7),
      type: "expense",
    },
    {
      id: "728ed52f",
      title: "McDonald's",
      amount: 10,
      date: new Date(2026, 2, 8),
      type: "expense",
    },
    {
      id: "728ed52f",
      title: "Freelance Work",
      amount: 100,
      date: new Date(2026, 2, 9),
      type: "income",
    },
    {
      id: "728ed52f",
      title: "AWS Services",
      amount: 200,
      date: new Date(2026, 2, 10),
      type: "expense",
    },
  ];
}

const monthProgressChartData = [
  { date: "1 - 8 May", savings: 600 },
  { date: "8 - 15 May", savings: 450 },
  { date: "15 - 22 May", savings: 1000 },
  { date: "22 - 29 May", savings: 850 },
  { date: "29 - 31 May", savings: 0 },
];

const categoriesRadialChartData = [
  { category: "ifood", balance: 310, fill: "var(--theme-100)" },
  { category: "sports", balance: 200, fill: "var(--theme-200)" },
  { category: "uber", balance: 150, fill: "var(--theme-300)" },
  { category: "school", balance: 100, fill: "var(--theme-500)" },
];

export default async function DashboardPage() {
  await getWallet();

  const transactions = await getTransactions();

  return (
    <div className="@container/main flex h-full min-h-0 flex-1 flex-col overflow-hidden">
      <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-4 gap-4 p-4 md:p-6 lg:grid-cols-2 lg:grid-rows-2">
        <section className="min-h-0 overflow-hidden">
          <TestSectionCards />
        </section>

        <section className="min-h-0 overflow-hidden lg:row-start-2">
          <MonthProgressChart data={monthProgressChartData} month="May 2026" />
        </section>

        <section className="min-h-0 overflow-hidden lg:col-start-2 lg:row-start-1">
          <CategoriesRadialChart data={categoriesRadialChartData} month="May 2026" />
        </section>

        <section className="min-h-0 overflow-hidden lg:col-start-2 lg:row-start-2">
          <TransactionsTable columns={columns} data={transactions} />
        </section>
      </div>
    </div>
  );
}
