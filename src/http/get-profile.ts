import { api } from './api-client'

export type HTTPGetProfileResponse = {
    user: {
        name: string | null
        email: string
        avatarUrl: string | null
    }
}

export async function HTTPGetProfile() {
    const result = await api
        .get('api/profile')
        .json<HTTPGetProfileResponse>()

    return result
}