"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartStyle,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CategoryMetrics } from "@/strategies/get-categories-metrics"

export const description = "A dynamic savings by categories pie chart"

type ChartDataItem = CategoryMetrics & {
    fill: string
}

type CategoryKey = string

type CustomPieShapeProps = {
    cx?: number
    cy?: number
    innerRadius?: number
    outerRadius?: number
    startAngle?: number
    endAngle?: number
    fill?: string
    payload?: ChartDataItem
}

const themeColors = [
    "var(--theme-100)",
    "var(--theme-200)",
    "var(--theme-300)",
    "var(--theme-400)",
    "var(--theme-500)",
]

function buildChartData(categories: CategoryMetrics[]): ChartDataItem[] {
    return categories.map((item, index) => ({
        ...item,
        fill: themeColors[index % themeColors.length],
    })).sort((a, b) => b.expenses - a.expenses)
}

function buildChartConfig(categories: CategoryMetrics[]): ChartConfig {
    const config: ChartConfig = {
        expenses: {
            label: "Expenses",
        },
    }

    categories.forEach((item, index) => {
        const key = item.slug

        config[key] = {
            label: item.name,
            color: themeColors[index % themeColors.length],
        }
    })

    return config
}

interface CategoriesPieChartInteractiveProps {
    data: CategoryMetrics[]
}

export function CategoriesPieChartInteractive({
    data,
}: CategoriesPieChartInteractiveProps) {
    const id = "pie-savings-by-category"

    const chartData = React.useMemo(() => buildChartData(data), [data])
    const chartConfig = React.useMemo(() => buildChartConfig(data), [data])

    const categories = React.useMemo(
        () => chartData.map((item) => item.name),
        [chartData]
    )

    const [activeCategory, setActiveCategory] = React.useState<CategoryKey>(
        chartData[0]?.name ?? ""
    )

    const activeIndex = React.useMemo(
        () => chartData.findIndex((item) => item.name === activeCategory),
        [chartData, activeCategory]
    )

    const activeItem = chartData[activeIndex]

    const renderPieShape = React.useCallback(
        (props: CustomPieShapeProps) => {
            const { outerRadius = 0, innerRadius = 0, ...rest } = props

            const isActive = props.payload?.name === activeCategory

            if (isActive) {
                return (
                    <g>
                        <Sector
                            {...rest}
                            innerRadius={innerRadius}
                            outerRadius={outerRadius + 6}
                        />
                        <Sector
                            {...rest}
                            innerRadius={outerRadius + 8}
                            outerRadius={outerRadius + 14}
                        />
                    </g>
                )
            }

            return (
                <Sector
                    {...rest}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                />
            )
        },
        [activeCategory]
    )

    return (
        <Card
            data-chart={id}
            className="flex h-full min-h-0 flex-col overflow-hidden bg-transparent"
        >
            <ChartStyle id={id} config={chartConfig} />

            <CardHeader className="flex flex-row items-center justify-between pb-0">
                <div className="grid gap-1">
                    <CardTitle>Expenses by Categories</CardTitle>
                    <CardDescription>
                        Distribution of expenses across user categories
                    </CardDescription>
                </div>

                <Select value={activeCategory} onValueChange={setActiveCategory}>
                    <SelectTrigger
                        className="h-7 w-[160px] rounded-lg pl-2.5"
                        aria-label="Select category"
                    >
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>

                    <SelectContent align="end" className="rounded-xl">
                        {categories.map((category, index) => {
                            const color = chartData[index]?.fill

                            return (
                                <SelectItem
                                    key={category}
                                    value={category}
                                    className="rounded-lg [&_span]:flex"
                                >
                                    <div className="flex items-center gap-2 text-xs">
                                        <span
                                            className="flex h-3 w-3 shrink-0 rounded-xs"
                                            style={{ backgroundColor: color }}
                                        />
                                        {category}
                                    </div>
                                </SelectItem>
                            )
                        })}
                    </SelectContent>
                </Select>
            </CardHeader>

            <CardContent className="flex min-h-0 flex-1 px-4 pb-4">
                <ChartContainer
                    id={id}
                    config={chartConfig}
                    className="h-full w-full !aspect-auto"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    hideLabel
                                    formatter={(value: number, name: string) => (
                                        <div className="flex min-w-[130px] items-center text-xs text-muted-foreground">
                                            {chartConfig[name as keyof typeof chartConfig]?.label ||
                                                name}
                                            <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium text-foreground tabular-nums">
                                                ${Number(value).toFixed(2)}
                                            </div>
                                        </div>
                                    )}
                                />
                            }
                        />

                        <Pie
                            data={chartData}
                            dataKey="expenses"
                            nameKey="category"
                            innerRadius={60}
                            outerRadius={120}
                            strokeWidth={5}
                            shape={renderPieShape}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (
                                        !viewBox ||
                                        !("cx" in viewBox) ||
                                        !("cy" in viewBox)
                                    ) {
                                        return null
                                    }

                                    return (
                                        <text
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                        >
                                            <tspan
                                                x={viewBox.cx}
                                                y={viewBox.cy - 5}
                                                className="fill-foreground text-2xl font-bold"
                                            >
                                                {(activeItem?.expenses ?? 0).toFixed(2)}
                                            </tspan>

                                            <tspan
                                                x={viewBox.cx}
                                                y={viewBox.cy + 15}
                                                className="fill-muted-foreground text-sm"
                                            >
                                                {activeItem?.name ?? "Category"}
                                            </tspan>
                                        </text>
                                    )
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}