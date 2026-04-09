import { api } from './api-client'

type HTTPUpdateCategoryRequest = {
    categoryId: string
    name: string
    description?: string
}

type HTTPUpdateCategoryResponse = void

export async function HTTPUpdateCategory({
    categoryId,
    name,
    description
}: HTTPUpdateCategoryRequest) {
    const result = await api
        .put(`api/wallet/categories/${categoryId}`, {
            json: {
                name,
                description,
            },
        })
        .json<HTTPUpdateCategoryResponse>()

    return result
}