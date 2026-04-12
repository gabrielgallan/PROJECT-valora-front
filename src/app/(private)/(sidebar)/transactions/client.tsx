'use client'

import { useState, useTransition } from "react";

import { TransactionsDataTable } from "@/components/transactions/data-table/transactions-data-table";
import { TransactionsCountRadarChart } from "@/components/transactions/transactions-count-radar-chart";
import { TransactionsChart } from "@/components/transactions/transactions-chart";
import { type HTTPGetYearProgressResponse } from "@/http/get-year-progress";
import { type CategoryItem } from "@/http/list-categories";
import { type TransactionItem } from "@/http/list-transactions";
import { YearProgressMapper } from "@/strategies/mappers/year-progress-mapper";

import { createTransactionAction, listTransctionsAction } from "./actions";
import { type TransactionsFilters } from "./types";

interface TransactionsPageClientProps {
    progress: HTTPGetYearProgressResponse;
    _transactions: TransactionItem[];
    categories: CategoryItem[];
}

function getFilterDateRange(filters: TransactionsFilters) {
    const from = filters.dateRange?.from;
    const to = filters.dateRange?.to;

    if (!from || !to) {
        return { startDate: undefined, endDate: undefined };
    }

    const startDate = new Date(from);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(to);
    endDate.setHours(23, 59, 59, 999);

    return {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
    };
}

export default function TransactionsPageClient({
    progress,
    _transactions,
    categories,
}: TransactionsPageClientProps) {
    const [transactions, setTransactions] = useState<TransactionItem[]>(_transactions);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    function handleFiltersChange(filters: TransactionsFilters) {
        const { startDate, endDate } = getFilterDateRange(filters);

        startTransition(async () => {
            const result = await listTransctionsAction({
                categoryId: filters.category === 'all' ? undefined : filters.category,
                startDate,
                endDate,
            });

            if (!result.success) {
                setError(result.message);
                return;
            }

            setError(null);
            setTransactions(result.transactions);
        });
    }

    return (
        <div className="@container/main flex flex-col p-4 md:p-6">
            <div className="flex flex-col gap-4">
                <section className="grid grid-cols-1 gap-4 lg:h-[24rem] lg:grid-cols-12">
                    <div className="overflow-hidden lg:col-span-8">
                        <TransactionsChart data={YearProgressMapper.toTransactionsChart(progress)} />
                    </div>

                    <div className="overflow-hidden lg:col-span-4">
                        <TransactionsCountRadarChart data={YearProgressMapper.toTransactionsCountChart(progress)} />
                    </div>
                </section>

                <section className="flex flex-col gap-2">
                    <TransactionsDataTable
                        data={{ transactions, categories }}
                        onFiltersChange={handleFiltersChange}
                        createAction={createTransactionAction}
                        isLoading={isPending}
                    />

                    {error ? <p className="text-sm text-destructive">{error}</p> : null}
                </section>
            </div>
        </div>
    );
}
