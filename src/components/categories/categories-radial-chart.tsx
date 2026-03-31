"use client"

import * as React from "react"
import { Pie, PieChart } from "recharts"

import type { Category } from "@/components/categories/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

type CategoriesRadialChartProps = {
  data: Category[]
}

const chartColors = [
  "var(--theme-100)",
  "var(--theme-200)",
  "var(--theme-300)",
  "var(--theme-400)",
  "var(--theme-500)",
]

export function CategoriesRadialChart({ data }: CategoriesRadialChartProps) {
  const usageData = React.useMemo(
    () =>
      [...data]
        .sort((left, right) => right.usageCount - left.usageCount)
        .slice(0, 5)
        .map((category, index) => ({
          key: category.slug,
          name: category.name,
          value: category.usageCount,
          fill: chartColors[index % chartColors.length],
        })),
    [data]
  )

  const chartConfig = React.useMemo(() => {
    return usageData.reduce<ChartConfig>((config, item) => {
      config[item.key] = { label: item.name, color: item.fill }
      return config
    }, {})
  }, [usageData])

  const totalUsage = usageData.reduce((sum, entry) => sum + entry.value, 0)

  return (
    <Card className="h-full bg-transparent py-4">
      <CardHeader className="px-4 pb-2">
        <CardTitle>Distribuicao por uso</CardTitle>
        <CardDescription>Top categorias com mais transacoes vinculadas</CardDescription>
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 flex-col px-4 pb-4">
        {usageData.length === 0 || totalUsage === 0 ? (
          <div className="flex h-full min-h-[220px] items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
            Ainda sem uso registrado para o grafico.
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="min-h-[220px] w-full">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="key" />} />
              <Pie
                data={usageData}
                dataKey="value"
                nameKey="key"
                innerRadius={54}
                outerRadius={88}
                strokeWidth={2}
              />
              <ChartLegend
                content={<ChartLegendContent nameKey="key" className="flex-wrap" />}
                verticalAlign="bottom"
                align="center"
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
