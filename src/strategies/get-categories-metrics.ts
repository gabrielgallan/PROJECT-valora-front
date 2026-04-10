import { HTTPGetSummaryByCategories } from "@/http/get-summary-by-categories"
import { HTTPListCategories } from "@/http/list-categories"
import { HTTPError } from "ky"

function getCurrentMonthInterval() {
    const now = new Date()

    const start = new Date(now.getFullYear(), now.getMonth(), 1)
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)

    return { start, end }
}

export interface CategoryMetrics {
    id: string
    name: string
    slug: string
    description: string | null
    expenses: number
    incomes: number
    savings: number
    usageCount: number
}

export async function getCategoriesMetrics(): Promise<CategoryMetrics[]> {
    try {
        const { start, end } = getCurrentMonthInterval()

        const [categoriesReply, summaryReply] = await Promise.all([
            HTTPListCategories(),
            HTTPGetSummaryByCategories({ start, end }),
        ])

        const categoriesById = new Map(
            categoriesReply.categories.map((category) => [category.id, category])
        )

        const result = summaryReply.categories
            .map((metric) => {
                const category = categoriesById.get(metric.categoryId)

                if (!category) {
                    return null
                }

                return {
                    ...category,
                    expenses: Number(metric.totals.expense) || 0,
                    incomes: Number(metric.totals.income) || 0,
                    savings: Number(metric.netBalance) || 0,
                    usageCount: metric.counts.transactions
                }
            })
            .filter((item): item is CategoryMetrics => item !== null)

        return result
    } catch (err) {
        if (err instanceof HTTPError) {
            console.error(err)
        }

        return []
    }
}
