"use client";

import { TransactionsCountRadarChart, TransactionsCountRadarChartData } from "@/components/transactions/transactions-count-radar-chart";
import { TransactionsDataTable } from "@/components/transactions/data-table/transactions-data-table";
import { TransactionChartData, TransactionsChart } from "@/components/transactions/transactions-chart";
import { Transaction } from "@/http/types/transaction";

export interface TransactionsPageClientProps {
  transactions: Transaction[];
  yearProgress: TransactionChartData[]
  counts: TransactionsCountRadarChartData[]
}

export function TransactionsPageClient({ transactions, yearProgress, counts }: TransactionsPageClientProps) {
  return (
    <div className="@container/main flex flex-col p-4 md:p-6">
      <div className="flex flex-col gap-4">
        <section className="grid grid-cols-1 gap-4 lg:h-[24rem] lg:grid-cols-12">
          <div className="overflow-hidden lg:col-span-8">
            <TransactionsChart data={yearProgress} />
          </div>

          <div className="overflow-hidden lg:col-span-4">
            <TransactionsCountRadarChart data={counts} />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <TransactionsDataTable data={transactions} />
        </section>
      </div>
    </div>
  );
}
