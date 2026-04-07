import { api } from './api-client'

export type HTTPGetYearProgressResponse = {
    progress: {
        year: {
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
            }
        },
        months: [
            {
                year: number,
                monthIndex: number,
                summary: {
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
            }
        ]
    }
}

export async function HTTPGetYearProgress() {
    const result = await api
        .get('api/wallet/summary/year')
        .json<HTTPGetYearProgressResponse>()

    return result
}