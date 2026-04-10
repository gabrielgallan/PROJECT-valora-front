import { api } from './api-client'

interface TransactionInterval {
    startDate: string
    endDate: string
}

interface TransactionCategory {
    name: string
    slug: string
}

interface TransactionItem {
    id: string
    title: string
    amount: number
    operation: 'expense' | 'income'
    method: string | null
    category: TransactionCategory | null
    createdAt: string
}

interface TransactionPagination {
    page: number
    limit: number
}

export type HTTPListTransactionsResponse = {
    interval: TransactionInterval
    transactions: TransactionItem[]
    pagination: TransactionPagination
}

type ListTransactionsQuery = {
    categoryId?: string,
    start?: string,
    end?: string,
    page?: number,
    limit?: number,
}

export async function HTTPListTransactions(searchParams: ListTransactionsQuery) {
    const result = await api
        .get('api/wallet/transactions', { searchParams })
        .json<HTTPListTransactionsResponse>()

    return result
}