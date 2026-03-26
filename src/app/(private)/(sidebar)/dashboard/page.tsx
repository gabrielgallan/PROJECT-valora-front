import { CategoriesRadialChart } from "@/components/categories-radial-chart";
import { TestSectionCards } from "@/components/cards-test";
import { MonthProgressChart } from "@/components/month-progress-chart";
import { columns } from "@/components/transactions-table/columns";
import { TransactionsTable } from "@/components/transactions-table/transactions-table";
import { getWallet } from "@/strategies/get-wallet";
import { Transaction } from "@/http/types/transaction";

async function getTransactions(): Promise<Transaction[]> {
  // TODO: replace mocked list with API request.
  return [
    {
      id: "tx_001",
      title: "Salário",
      amount: 5000,
      operation: "income",
      description: "Pagamento mensal",
      method: "bank_transfer",
      category: { name: "Renda", slug: "income" },
      createdAt: new Date("2026-03-01T09:00:00"),
    },
    {
      id: "tx_002",
      title: "Supermercado",
      amount: 320.5,
      operation: "expense",
      description: "Compras da semana",
      method: "credit_card",
      category: { name: "Alimentação", slug: "food" },
      createdAt: new Date("2026-03-02T18:30:00"),
    },
    {
      id: "tx_003",
      title: "Aluguel",
      amount: 1500,
      operation: "expense",
      description: null,
      method: "pix",
      category: { name: "Moradia", slug: "housing" },
      createdAt: new Date("2026-03-03T10:15:00"),
    },
    {
      id: "tx_004",
      title: "Freelance",
      amount: 1200,
      operation: "income",
      description: "Projeto backend",
      method: "bank_transfer",
      category: { name: "Extra", slug: "extra-income" },
      createdAt: new Date("2026-03-05T14:00:00"),
    },
    {
      id: "tx_005",
      title: "Restaurante",
      amount: 85.9,
      operation: "expense",
      description: "Jantar",
      method: "debit_card",
      category: { name: "Alimentação", slug: "food" },
      createdAt: new Date("2026-03-06T20:10:00"),
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
  { category: "salary", balance: 310, fill: "var(--theme-100)" },
  { category: "ifood", balance: 310, fill: "var(--theme-100)" },
  { category: "sports", balance: 200, fill: "var(--theme-200)" },
  { category: "uber", balance: 150, fill: "var(--theme-300)" },
  { category: "school", balance: 100, fill: "var(--theme-500)" },
];

export default async function DashboardPage() {
  await getWallet();

  const transactions = await getTransactions();

  return (
    <div className="@container/main flex h-full min-h-0 flex-1 flex-col">
      <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-4 gap-4 p-4 md:p-6 lg:grid-cols-12 lg:grid-rows-2">
        <section className="min-h-0 overflow-hidden lg:col-span-7 lg:row-start-1">
          <TestSectionCards />
        </section>

        <section className="min-h-0 overflow-hidden lg:col-span-6 lg:row-start-2">
          <MonthProgressChart data={monthProgressChartData} month="May 2026" />
        </section>

        <section className="min-h-[320px] overflow-visible lg:col-span-5 lg:row-start-1 lg:min-h-0">
          <CategoriesRadialChart data={categoriesRadialChartData} month="May 2026" />
        </section>

        <section className="min-h-0 overflow-hidden lg:col-span-6 lg:row-start-2">
          <TransactionsTable columns={columns} data={transactions} />
        </section>
      </div>
    </div>
  );
}
