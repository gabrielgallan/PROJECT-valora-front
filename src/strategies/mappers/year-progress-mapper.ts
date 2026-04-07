import { KPIDataSource } from "@/components/dashboard/kpi-cards";
import { SavingsChartData } from "@/components/dashboard/savings-chart-int";
import { HTTPGetYearProgressResponse } from "@/http/get-year-progress";
import { format } from "date-fns"
import { enUS } from "date-fns/locale"

function getMonthName(index: number): string {
    return format(new Date(2025, index), "MMMM", { locale: enUS })
}

function calculateGrowth(current: number, previous: number): number {
    if (previous === 0) return 0
    return (current - previous) / previous
}

function calculateSavingRate(income: number, expense: number) {
    if (income === 0) return 0
    return (income - expense) / income
}

export class YearProgressMapper {
    static toSavingsChart(data: HTTPGetYearProgressResponse): SavingsChartData[] {
        return data.progress.months.map(m => {
            return {
                date: `${getMonthName(m.monthIndex)} ${m.year}`,
                savings: m.summary.netBalance
            }
        })
    }

    static toKpiCards(data: HTTPGetYearProgressResponse): Omit<KPIDataSource, 'balance'> {
        const currentMonthSummary = data.progress.months[data.progress.months.length - 1].summary
        const lastMonthSummary = data.progress.months[data.progress.months.length - 2].summary

        const currentSavingRate = calculateSavingRate(currentMonthSummary.totals.income, currentMonthSummary.totals.expense)
        const lastMonthSavingRate = calculateSavingRate(lastMonthSummary.totals.income, lastMonthSummary.totals.expense)

        return {
            income: {
                total: currentMonthSummary.totals.income,
                percent: calculateGrowth(currentMonthSummary.totals.income, lastMonthSummary.totals.income)
            },
            expense: {
                total: currentMonthSummary.totals.expense,
                percent: calculateGrowth(currentMonthSummary.totals.expense, lastMonthSummary.totals.expense)
            },
            savingRate: {
                value: currentSavingRate,
                percent: calculateGrowth(currentSavingRate, lastMonthSavingRate)
            }
        }
    }
}