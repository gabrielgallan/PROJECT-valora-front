export interface Transaction {
    id: string,
    title: string,
    amount: number,
    operation: 'expense' | 'income',
    description: string | null,
    method: string | null,
    category: {
        name: string,
        slug: string
    } | null,
    createdAt: Date
}