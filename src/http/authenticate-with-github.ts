import { api } from './api-client'

type HTTPAuthenticateWithGithubRequest = {
    code: string
}

type HTTPAuthenticateWithGithubResponse = {
    token: string
}

export async function HTTPAuthenticateWithGithub({
    code
}: HTTPAuthenticateWithGithubRequest) {
    const result = await api
        .post('api/sessions/github', {
            json: {
                code,
            },
        })
        .json<HTTPAuthenticateWithGithubResponse>()

    return result
}