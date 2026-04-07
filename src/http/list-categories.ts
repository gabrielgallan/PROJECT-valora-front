import { api } from './api-client'

export type HTTPListCategoriesResponse = {
    categories: {
        id: string,
        name: string,
        slug: string,
        description: string | null
    }[]
}

export async function HTTPListCategories() {
    const result = await api
        .get('api/wallet/categories')
        .json<HTTPListCategoriesResponse>()

    return result
}