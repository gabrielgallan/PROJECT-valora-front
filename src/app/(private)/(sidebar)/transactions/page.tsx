import { HTTPGetYearProgress } from "@/http/get-year-progress";
import { HTTPListCategories } from "@/http/list-categories";
import { HTTPListTransactions } from "@/http/list-transactions";

import TransactionsPageClient from "./client";

export default async function TransactionsPage() {
  const [{ transactions }, { categories }, progress] = await Promise.all([
    HTTPListTransactions({}),
    HTTPListCategories(),
    HTTPGetYearProgress(),
  ]);

  return (
    <TransactionsPageClient
      progress={progress}
      _transactions={transactions}
      categories={categories}
    />
  );
}
