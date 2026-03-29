import { CategoriesPageClient } from "@/components/categories/categories-page-client"
import type { Category } from "@/components/categories/types"

async function getCategories(): Promise<Category[]> {
  return [
    {
      id: "cat_001",
      name: "Alimentacao",
      slug: "alimentacao",
      icon: "utensils",
      status: "active",
      usageCount: 24,
      updatedAt: new Date("2026-03-26T10:20:00"),
    },
    {
      id: "cat_002",
      name: "Moradia",
      slug: "moradia",
      icon: "house",
      status: "active",
      usageCount: 12,
      updatedAt: new Date("2026-03-25T09:00:00"),
    },
    {
      id: "cat_003",
      name: "Transporte",
      slug: "transporte",
      icon: "car",
      status: "active",
      usageCount: 9,
      updatedAt: new Date("2026-03-24T15:10:00"),
    },
    {
      id: "cat_004",
      name: "Saude",
      slug: "saude",
      icon: "heart-pulse",
      status: "inactive",
      usageCount: 2,
      updatedAt: new Date("2026-03-23T11:45:00"),
    },
    {
      id: "cat_005",
      name: "Lazer",
      slug: "lazer",
      icon: "sparkles",
      status: "inactive",
      usageCount: 0,
      updatedAt: new Date("2026-03-22T18:40:00"),
    },
    {
      id: "cat_006",
      name: "Investimentos",
      slug: "investimentos",
      icon: "piggy-bank",
      status: "active",
      usageCount: 6,
      updatedAt: new Date("2026-03-21T08:30:00"),
    },
  ]
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return <CategoriesPageClient initialCategories={categories} />
}
