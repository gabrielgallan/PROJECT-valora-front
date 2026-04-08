"use client"

import { CategoriesDataTable, CategoryTableRow } from "@/components/categories/categories-data-table/categories-data-table"
import {
  CategoriesRadialChart,
  CategoriesRadialChartDatum,
} from "@/components/categories/categories-radial-chart"
import {
  CategoriesSavingsBarChart,
  CategorySavingsDatum,
} from "@/components/categories/categories-savings-bar-chart"

export interface CategoriesPageClientProps {
  datas: {
    savingsByCategory: CategorySavingsDatum[]
    categoryUsageDistribution: CategoriesRadialChartDatum[]
    categoriesTable: CategoryTableRow[]
    monthLabel: string
  }
}

export function CategoriesPageClient({ datas }: CategoriesPageClientProps) {
  return (
    <div className="@container/main flex min-h-0 flex-1 flex-col">
      <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-2 gap-4 p-4 md:p-6 lg:grid-cols-12 lg:grid-rows-[22rem_minmax(0,1fr)]">
        <section className="min-h-0 overflow-hidden lg:col-span-7 lg:row-start-1">
          <CategoriesSavingsBarChart month={datas.monthLabel} data={datas.savingsByCategory} />
        </section>

        <section className="min-h-0 overflow-hidden lg:col-span-5 lg:row-start-1">
          <CategoriesRadialChart data={datas.categoryUsageDistribution} />
        </section>

        <section className="min-h-0 overflow-hidden lg:col-span-12 lg:row-start-2">
          <CategoriesDataTable data={datas.categoriesTable} />
        </section>
      </div>
    </div>
  )
}
