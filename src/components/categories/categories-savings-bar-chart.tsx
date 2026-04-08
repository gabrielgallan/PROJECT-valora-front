"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useState } from "react"

const categoriesSavingsChartConfig = {
  metric: {
    label: "Amount",
    color: "var(--theme-100)",
  },
} satisfies ChartConfig

type DataType = "expenses" | "incomes" | "savings"

function isDataType(value: string): value is DataType {
  return value === "expenses" || value === "incomes" || value === "savings"
}

export interface CategorySavingsDatum {
  category: string
  incomes: number
  expenses: number
  savings: number
}

interface CategoriesSavingsBarChartProps {
  month: string
  data: CategorySavingsDatum[]
}

export function CategoriesSavingsBarChart({ month, data }: CategoriesSavingsBarChartProps) {
  const [dataType, setDataType] = useState<DataType>("expenses")

  const handleDataTypeChange = (value: string) => {
    if (isDataType(value)) {
      setDataType(value)
    }
  }

  const formatted = data.map(c => {
    return {
      category: c.category,
      metric: c[dataType]
    }
  })

  const sortedData = [...formatted].sort((a, b) => b.metric - a.metric)

  return (
    <Card className="flex h-full min-h-0 flex-col overflow-hidden bg-transparent py-4">
      <CardHeader className="flex px-4">
        <div className="flex flex-col gap-2">
          <CardTitle>Savings by Category</CardTitle>
          <CardDescription>{month}</CardDescription>
        </div>

        <Select value={dataType} onValueChange={handleDataTypeChange}>
          <SelectTrigger
            className="bg-transparent w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select metric"
          >
            <SelectValue placeholder="Expenses" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="expenses" className="rounded-lg">
              Expenses
            </SelectItem>
            <SelectItem value="incomes" className="rounded-lg">
              Incomes
            </SelectItem>
            <SelectItem value="savings" className="rounded-lg">
              Savings
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 px-4 pb-4">
        <ChartContainer config={categoriesSavingsChartConfig} className="h-full w-full !aspect-auto">
          <BarChart accessibilityLayer data={sortedData} layout="vertical" margin={{ left: 12, right: 12 }}>
            <CartesianGrid horizontal={false} />

            <YAxis dataKey="category" type="category" tickLine={false} axisLine={false} width={90} />

            <XAxis dataKey="metric" type="number" tickLine={false} axisLine={false} />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) =>
                    new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(Number(value))
                  }
                />
              }
            />

            <Bar dataKey="metric" radius={8} fill="var(--theme-100)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
