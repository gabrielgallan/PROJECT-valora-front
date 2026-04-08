'use client'

import { KPICards } from "@/components/dashboard/kpi-cards";
import { SavingsChartData, SavingsChartInteractive } from "@/components/dashboard/savings-chart-int";
import { CategoriesPieChartInteractive, CategoryMetrics } from "@/components/dashboard/categories-pie-chart-int";

export interface KPIDataSource {
    balance: {
        total: number
    }
    savingRate: {
        value: number
        percent: number
    }
    income: {
        total: number
        percent: number
    }
    expense: {
        total: number
        percent: number
    }
}

export interface DashboardPageClientProps {
    datas: {
        kpis: KPIDataSource
        savingsChart: SavingsChartData[]
        categoriesMetrics: CategoryMetrics[]
    }
}

export function DashboardPageClient({ datas }: DashboardPageClientProps) {
    return (
        <div className="@container/main flex min-h-0 flex-1 flex-col">
            <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-4 gap-4 p-4 md:p-6 lg:grid-cols-12 lg:grid-rows-2">
                <section className="min-h-0 overflow-hidden lg:col-span-7 lg:row-start-1">
                    <KPICards data={datas.kpis} />
                </section>

                <section className="min-h-0 overflow-hidden lg:col-span-12 lg:row-start-2">
                    <SavingsChartInteractive data={datas.savingsChart} />
                </section>

                <section className="min-h-0 lg:col-span-5 lg:row-start-1 lg:min-h-0">
                    <CategoriesPieChartInteractive data={datas.categoriesMetrics} />
                </section>
            </div>
        </div>
    );
}
