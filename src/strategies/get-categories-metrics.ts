import { CategoryMetrics } from "@/components/dashboard/categories-pie-chart-int"
import { HTTPGetSummaryByCategories } from "@/http/get-summary-by-categories"
import { HTTPListCategories } from "@/http/list-categories"
import { HTTPError } from "ky"

function getCurrentMonthInterval() {
    const now = new Date()

    const start = new Date(now.getFullYear(), now.getMonth(), 1)
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)

    return { start, end }
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

        return summaryReply.categories
            .map((metric) => {
                const category = categoriesById.get(metric.categoryId)

                if (!category) {
                    return null
                }

                return {
                    category: category.name,
                    slug: category.slug,
                    expenses: Number(metric.totals.expense) || 0,
                }
            })
            .filter((item): item is CategoryMetrics => item !== null)
            .sort((a, b) => b.expenses - a.expenses)
    } catch (err) {
        if (err instanceof HTTPError) {
            console.error(err)
        }

        throw err
    }
}
