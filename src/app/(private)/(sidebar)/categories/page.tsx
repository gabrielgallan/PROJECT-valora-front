import { getCategoriesMetrics } from "@/strategies/get-categories-metrics"
import {
  CategoriesPageClient,
} from "./client"

export default async function CategoriesPage() {
  const data = await getCategoriesMetrics()
  const rows = data.map(d => {
    return {
      ...d
    }
  })

  return <CategoriesPageClient data={data} rows={rows} />
}
