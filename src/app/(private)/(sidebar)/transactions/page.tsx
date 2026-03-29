import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { TransactionsChart } from "@/components/transactions-chart";
import { TransactionsDataTable } from "@/components/transactions-data-table/transactions-data-table";
import { Transaction } from "@/http/types/transaction";
import { Calendar, Download, Plus, SlidersHorizontal } from "lucide-react";

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
            <Card className="h-full gap-0 bg-transparent py-0">
              <CardHeader className="gap-3 border-b px-4 py-4 sm:px-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <CardTitle className="text-2xl tracking-tight">Transactions</CardTitle>
                    <CardDescription>
                      Manage your cash flow with quick actions and a detailed activity table.
                    </CardDescription>
                  </div>

                  <Badge variant="secondary" className="shrink-0">
                    <Calendar data-icon="inline-start" />
                    May 2026
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col justify-center gap-4 px-4 py-4 sm:px-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Button>
                    <Plus data-icon="inline-start" />
                    New transaction
                  </Button>

                  <Button variant="outline" className="bg-transparent dark:bg-transparent">
                    <Download data-icon="inline-start" />
                    Export CSV
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="bg-transparent dark:bg-transparent">
                        <SlidersHorizontal data-icon="inline-start" />
                        More actions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem>Import transactions</DropdownMenuItem>
                      <DropdownMenuItem>Bulk categorize</DropdownMenuItem>
                      <DropdownMenuItem>Recurring rules</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <Separator />

                <p className="text-sm text-muted-foreground">
                  Tip: use category and date filters below to quickly isolate spending patterns.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="overflow-hidden lg:col-span-6">
            <div className="h-full">
              <TransactionsChart month="May 2026" />
            </div>
          </section>
        </section>

        <section className="flex flex-col mt-4 gap-4">
          <TransactionsDataTable data={transactions} />
        </section>
      </div>
    </div >
  );
}
