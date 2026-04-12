import { api } from './api-client'

export type HTTPCreateTransactionRequest = {
    body: {
        categoryId?: string,
        title: string,
        description?: string,
        amount: number,
        operation: 'income' | 'expense',
        method: string
    }
}

export async function HTTPCreateTransaction({ body }: HTTPCreateTransactionRequest) {
    const result = await api
        .post('api/wallet/transactions', {
            json: body
        })

    return result.status
}
