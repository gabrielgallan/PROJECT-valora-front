import { api } from './api-client'

type HTTPAuthenticateRequest = {
    email: string
    password: string
}

type HTTPAuthenticateResponse = {
    token: string
}

export async function HTTPAuthenticate({
    email,
    password,
}: HTTPAuthenticateRequest) {
    const result = await api
        .post('api/sessions', {
            json: {
                email,
                password,
            },
        })
        .json<HTTPAuthenticateResponse>()

    return result
}