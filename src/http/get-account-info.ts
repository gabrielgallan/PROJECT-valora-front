import { api } from './api-client'

type HTTPGetAccountInfoResponse = {
    balance: number
    createdAt: string,
    updatedAt: string
}

export async function HTTPGetAccountInfo() {
    const result = await api
        .get('api/account')
        .json<HTTPGetAccountInfoResponse>()

    return result
}