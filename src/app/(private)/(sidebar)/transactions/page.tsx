import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TransactionsChart } from "@/components/transactions-chart";
import { TransactionsDataTable } from "@/components/transactions-data-table/transactions-data-table";
import { Transaction } from "@/http/types/transaction";
import { Download, Plus, SlidersHorizontal } from "lucide-react";
import { ChartRadialText } from "@/components/char-radial-text";

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
      <div className="flex flex-col gap-4">
        <section className="grid grid-cols-1 gap-4 lg:h-[24rem] lg:grid-cols-12">
          <div className="overflow-hidden lg:col-span-8">
            <TransactionsChart month="May 2026" />
          </div>

          <div className="overflow-hidden lg:col-span-4">
            <ChartRadialText />
          </div>
        </section>

        <section className="flex justify-end">
          <Button className="group flex items-center gap-2 rounded-full px-3 hover:px-5 transition-all duration-200 overflow-hidden">
            <Plus />

            <span className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-200 whitespace-nowrap">
              New Transaction
            </span>
          </Button>
        </section>

        <section className="flex flex-col gap-4">
          <TransactionsDataTable data={transactions} />
        </section>
      </div>
    </div >
  );
}