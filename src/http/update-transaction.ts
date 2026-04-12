import { api } from './api-client'

export type HTTPUpdateTransactionRequest = {
    transactionId: string
    body: {
        categoryId?: string,
        title?: string,
        description?: string,
        method?: string
    }
}

export async function HTTPUpdateTransaction({
    transactionId,
    body
}: HTTPUpdateTransactionRequest) {
    const result = await api
        .put(`api/wallet/transactions/${transactionId}`, body)

    return result.status
}