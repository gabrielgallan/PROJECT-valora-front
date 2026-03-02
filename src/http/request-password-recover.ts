import { api } from './api-client'

type HTTPPasswordRecoverRequest = {
    email: string
}

type HTTPPasswordRecoverResponse = null

export async function HTTPRecoverPassword({
    email,
}: HTTPPasswordRecoverRequest) {
    const result = await api
        .post('api/password/recover', {
            json: {
                email,
            },
        })
        .json<HTTPPasswordRecoverResponse>()

    return result
}