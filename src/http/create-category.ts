import { api } from './api-client'

type HTTPCreateCategoryRequest = {
    name: string
    description?: string
}

type HTTPCreateCategoryResponse = void

export async function HTTPCreateCategory({
    name,
    description
}: HTTPCreateCategoryRequest) {
    const result = await api
        .post('api/wallet/categories', {
            json: {
                name,
                description,
            },
        })
        .json<HTTPCreateCategoryResponse>()

    return result
}