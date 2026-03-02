import { api } from './api-client'

type HTTPResetPasswordRequest = {
    code: string
    password: string
}

type HTTPResetPasswordResponse = null

export async function HTTPResetPassword(body: HTTPResetPasswordRequest) {
    const result = await api
        .put('api/profile/password', {
            json: body
        })
        .json<HTTPResetPasswordResponse>()

    return result
}