import {
  CategoriesPageClient,
  CategoriesPageClientProps,
} from "./client"

function getCategoriesPageMockData(): CategoriesPageClientProps["datas"] {
  const categories = [
    {
      id: "cat_001",
      name: "Food",
      slug: "food",
      usageCount: 24,
      updatedAt: new Date("2026-03-26T10:20:00"),
      savings: 220,
      income: 500,
      expense: 280,
    },
    {
      id: "cat_002",
      name: "Housing",
      slug: "housing",
      usageCount: 12,
      updatedAt: new Date("2026-03-25T09:00:00"),
      savings: 950,
      income: 1500,
      expense: 550,
    },
    {
      id: "cat_003",
      name: "Transport",
      slug: "transport",
      usageCount: 9,
      updatedAt: new Date("2026-03-24T15:10:00"),
      savings: 340,
      income: 600,
      expense: 260,
    },
    {
      id: "cat_004",
      name: "Health",
      slug: "health",
      usageCount: 2,
      updatedAt: new Date("2026-03-23T11:45:00"),
      savings: 180,
      income: 300,
      expense: 120,
    },
    {
      id: "cat_005",
      name: "Leisure",
      slug: "leisure",
      usageCount: 0,
      updatedAt: new Date("2026-03-22T18:40:00"),
      savings: 120,
      income: 250,
      expense: 130,
    },
    {
      id: "cat_006",
      name: "Investments",
      slug: "investments",
      usageCount: 6,
      updatedAt: new Date("2026-03-21T08:30:00"),
      savings: 1160,
      income: 2000,
      expense: 840,
    },
  ]

  return {
    monthLabel: "March 2026",
    savingsByCategory: categories.map((category) => ({
      category: category.name,
      expenses: category.expense,
      incomes: category.income,
      savings: category.savings,
    })),
    categoryUsageDistribution: categories.map((category) => ({
      slug: category.slug,
      name: category.name,
      usageCount: category.usageCount,
    })),
    categoriesTable: categories.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      usageCount: category.usageCount,
      updatedAt: category.updatedAt,
    })),
  }
}

export default async function CategoriesPage() {
  const datas = getCategoriesPageMockData()

  return <CategoriesPageClient datas={datas} />
}
