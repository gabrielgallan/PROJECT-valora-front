import { DatePickerDemo } from "@/components/example-date-picker";
import { MonthProgressChart } from "@/components/month-progress-chart";
import { PaginationIconsOnly } from "@/components/pagination";
import { TransactionsChart } from "@/components/transactions-chart";
import { columns2 } from "@/components/transactions-table/columns2";
import { TransactionsList } from "@/components/transactions-table/transactions-list";
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
    {
      id: "tx_006",
      title: "Internet",
      amount: 120,
      operation: "expense",
      description: "Plano mensal",
      method: "pix",
      category: { name: "Serviços", slug: "services" },
      createdAt: new Date("2026-03-07T11:45:00"),
    },
    {
      id: "tx_007",
      title: "Venda item usado",
      amount: 300,
      operation: "income",
      description: null,
      method: "cash",
      category: { name: "Vendas", slug: "sales" },
      createdAt: new Date("2026-03-08T16:20:00"),
    },
    {
      id: "tx_008",
      title: "Transporte",
      amount: 60,
      operation: "expense",
      description: "Uber e ônibus",
      method: "credit_card",
      category: { name: "Transporte", slug: "transport" },
      createdAt: new Date("2026-03-09T08:00:00"),
    },
    {
      id: "tx_009",
      title: "Academia",
      amount: 99.9,
      operation: "expense",
      description: "Mensalidade",
      method: "debit_card",
      category: { name: "Saúde", slug: "health" },
      createdAt: new Date("2026-03-10T07:30:00"),
    },
    {
      id: "tx_010",
      title: "Dividendos",
      amount: 250,
      operation: "income",
      description: "Rendimentos de ações",
      method: "bank_transfer",
      category: { name: "Investimentos", slug: "investments" },
      createdAt: new Date("2026-03-11T12:00:00"),
    },
  ];
}

export default async function TransactionsPage() {
  const transactions = await getTransactions();

  return (
    <div className="@container/main flex flex-col p-4 md:p-6">
      <div className="flex flex-col">
        <section className="grid grid-cols-1 gap-4 lg:h-[20rem] lg:grid-cols-12">
          <section className="overflow-hidden lg:col-span-6">
            <div className="flex h-full flex-col rounded-xl border bg-transparent p-4">
              <h1 className="text-2xl font-semibold tracking-tight">Transactions</h1>
            </div>
          </section>

          <section className="overflow-hidden lg:col-span-6">
            <div className="h-full">
              <TransactionsChart month="May 2026" />
            </div>
          </section>
        </section>

        <section>
          <header className="flex my-4 gap-4" >
            <DatePickerDemo />
            <DatePickerDemo />
          </header>
          <TransactionsList columns={columns2} data={transactions} />
        </section>
      </div>
    </div >
  );
}
