import { api } from './api-client'

type HTTPOpenAccountRequest = {
    initialBalance: number
}

type HTTPOpenAccountResponse = null

export async function HTTPOpenAccount({
    initialBalance
}: HTTPOpenAccountRequest) {
    const result = await api
        .post('api/accounts', {
            json: { initialBalance }
        })
        .json<HTTPOpenAccountResponse>()

    return result
}