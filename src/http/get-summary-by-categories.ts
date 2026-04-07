import { api } from './api-client'

export type HTTPGetSummaryByCategoriesResponse = {
    total: {
        categoryId: null,
        interval: {
            startDate: string,
            endDate: string
        },
        totals: {
            income: number,
            expense: number
        },
        netBalance: number,
        counts: {
            transactions: number
        },
        percentages: null
    },
    categories: [
        {
            categoryId: string,
            interval: {
                startDate: string,
                endDate: string
            },
            totals: {
                income: number,
                expense: number
            },
            netBalance: number,
            counts: {
                transactions: number
            },
            percentages: {
                income: number,
                expense: number
            }
        }
    ]
}

interface HTTPGetSummaryByCategoriesQuery {
    start: Date
    end: Date
}

export async function HTTPGetSummaryByCategories(query: HTTPGetSummaryByCategoriesQuery) {
    const result = await api
        .get('api/wallet/categories/summary', {
            searchParams: {
                start: query.start.toISOString(),
                end: query.end.toISOString()
            }
        })
        .json<HTTPGetSummaryByCategoriesResponse>()

    return result
}