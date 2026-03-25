import { MonthProgressChart } from "@/components/month-progress-chart";
import { columns, Transaction } from "@/components/transactions-table/columns";
import { TransactionsList } from "@/components/transactions-table/transactions-list";

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

export default async function TransactionsPage() {
  const transactions = await getTransactions();

  return (
    <div className="@container/main flex h-full min-h-0 flex-1 flex-col">
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 p-4 md:p-6 lg:grid-cols-12 lg:grid-rows-[minmax(240px,0.9fr)_minmax(0,1.1fr)]">
        <section className="min-h-0 lg:col-span-12 lg:row-start-1">
          <div className="grid h-full min-h-0 grid-cols-1 gap-4 lg:grid-cols-12">
            <section className="min-h-0 overflow-hidden lg:col-span-7">
              <div className="flex h-full min-h-0 flex-col rounded-xl border bg-transparent p-4">
                <h1 className="text-2xl font-semibold tracking-tight">Transactions</h1>
              </div>
            </section>

            <section className="min-h-0 overflow-hidden lg:col-span-5">
              <MonthProgressChart data={monthProgressChartData} month="May 2026" />
            </section>
          </div>
        </section>

        <section className="min-h-0 overflow-hidden lg:col-span-12 lg:row-start-2">
          <TransactionsList columns={columns} data={transactions} />
        </section>
      </div>
    </div>
  );
}
