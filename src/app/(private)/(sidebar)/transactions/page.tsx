import { Transaction } from "@/http/types/transaction";
import { TransactionsPageClient } from "./client";
import { HTTPGetYearProgress } from "@/http/get-year-progress";
import { YearProgressMapper } from "@/strategies/mappers/year-progress-mapper";
import { HTTPListTransactions } from "@/http/list-transactions";

async function getTransactions(): Promise<Transaction[]> {
  // TODO: replace mocked list with API request.
  return [
    {
      id: "tx_001",
      title: "Salário",
      amount: 5000,
      operation: "income",
      method: "bank_transfer",
      category: { name: "Renda", slug: "income" },
      createdAt: "2026-03-01T09:00:00.000Z",
    },
    {
      id: "tx_002",
      title: "Supermercado",
      amount: 320.5,
      operation: "expense",
      method: "credit_card",
      category: { name: "Alimentação", slug: "food" },
      createdAt: "2026-03-02T18:30:00.000Z",
    },
    {
      id: "tx_003",
      title: "Aluguel",
      amount: 1500,
      operation: "expense",
      method: "pix",
      category: { name: "Moradia", slug: "housing" },
      createdAt: "2026-03-03T10:15:00.000Z",
    },
    {
      id: "tx_004",
      title: "Freelance",
      amount: 1200,
      operation: "income",
      method: null,
      category: { name: "Extra", slug: "extra-income" },
      createdAt: "2026-03-05T14:00:00.000Z",
    },
    {
      id: "tx_005",
      title: "Restaurante",
      amount: 85.9,
      operation: "expense",
      method: "debit_card",
      category: { name: "Alimentação", slug: "food" },
      createdAt: "2026-03-06T20:10:00.000Z",
    },
    {
      id: "tx_006",
      title: "Internet",
      amount: 120,
      operation: "expense",
      method: null,
      category: null,
      createdAt: "2026-03-07T11:45:00.000Z",
    },
    {
      id: "tx_007",
      title: "Venda item usado",
      amount: 300,
      operation: "income",
      method: "cash",
      category: { name: "Vendas", slug: "sales" },
      createdAt: "2026-03-08T16:20:00.000Z",
    },
    {
      id: "tx_008",
      title: "Transporte",
      amount: 60,
      operation: "expense",
      method: "credit_card",
      category: { name: "Transporte", slug: "transport" },
      createdAt: "2026-03-09T08:00:00.000Z",
    },
    {
      id: "tx_009",
      title: "Academia",
      amount: 99.9,
      operation: "expense",
      method: "debit_card",
      category: null,
      createdAt: "2026-03-10T07:30:00.000Z",
    },
    {
      id: "tx_010",
      title: "Dividendos",
      amount: 250,
      operation: "income",
      method: "bank_transfer",
      category: null,
      createdAt: "2026-03-11T12:00:00.000Z",
    },
  ];
}

export default async function TransactionsPage() {
  const transactions = await HTTPListTransactions({});
  const progress = await HTTPGetYearProgress()

  return <TransactionsPageClient
    transactions={transactions.transactions}
    yearProgress={YearProgressMapper.toTransactionsChart(progress)}
    counts={YearProgressMapper.toTransactionsCountChart(progress)}
  />
}
