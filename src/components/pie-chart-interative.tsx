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
    ChartLegend,
    ChartLegendContent,
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

export const description = "A dynamic savings by categories pie chart"

type SavingsCategory = {
    category: string
    savings: number
}

type ChartDataItem = SavingsCategory & {
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

const mockSavingsByCategories: SavingsCategory[] = [
    { category: "Food", savings: 420 },
    { category: "Uber", savings: 180 },
    { category: "Rent", savings: 1200 },
    { category: "Gym", savings: 95 },
    { category: "Streaming", savings: 70 },
]

const themeColors = [
    "var(--theme-100)",
    "var(--theme-200)",
    "var(--theme-300)",
    "var(--theme-400)",
    "var(--theme-500)",
]

function normalizeKey(value: string) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9-]/g, "")
        .toLowerCase()
}

function buildChartData(categories: SavingsCategory[]): ChartDataItem[] {
    return categories.map((item, index) => ({
        ...item,
        fill: themeColors[index % themeColors.length],
    }))
}

function buildChartConfig(categories: SavingsCategory[]): ChartConfig {
    const config: ChartConfig = {
        savings: {
            label: "Savings",
        },
    }

    categories.forEach((item, index) => {
        const key = normalizeKey(item.category)
        config[key] = {
            label: item.category,
            color: themeColors[index % themeColors.length],
        }
    })

    return config
}

// function formatCurrency(value: number) {
//     return new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: "USD",
//         maximumFractionDigits: 0,
//     }).format(value)
// }

export function ChartPieSavingsByCategory() {
    const id = "pie-savings-by-category"

    const chartData = React.useMemo(
        () => buildChartData(mockSavingsByCategories),
        []
    )

    const chartConfig = React.useMemo(
        () => buildChartConfig(mockSavingsByCategories),
        []
    )

    const categories = React.useMemo(
        () => chartData.map((item) => item.category),
        [chartData]
    )

    const [activeCategory, setActiveCategory] = React.useState<CategoryKey>(
        chartData[0]?.category ?? ""
    )

    const activeIndex = React.useMemo(
        () => chartData.findIndex((item) => item.category === activeCategory),
        [chartData, activeCategory]
    )

    const activeItem = chartData[activeIndex]

    const renderPieShape = React.useCallback(
        (props: CustomPieShapeProps) => {
            const {
                outerRadius = 0,
                innerRadius = 0,
                ...rest
            } = props

            const isActive = props.payload?.category === activeCategory

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
        <Card data-chart={id} className="flex h-full min-h-0 flex-col overflow-hidden bg-transparent">
            <ChartStyle id={id} config={chartConfig} />

            <CardHeader className="flex flex-row items-center justify-between pb-0">
                <div className="grid gap-1">
                    <CardTitle>Savings by Categories</CardTitle>
                    <CardDescription>
                        Distribution of savings across user categories
                    </CardDescription>
                </div>

                <Select
                    value={activeCategory}
                    onValueChange={setActiveCategory}
                >
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
                                <ChartTooltipContent hideLabel
                                    formatter={(value, name) => (
                                        <div className="flex min-w-[130px] items-center text-xs text-muted-foreground">
                                            {chartConfig[name as keyof typeof chartConfig]?.label || name}
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
                            dataKey="savings"
                            nameKey="category"
                            innerRadius={60}
                            outerRadius={120}
                            strokeWidth={5}
                            shape={renderPieShape}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox)) {
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
                                                {(activeItem?.savings.toFixed(2) ?? 0)}
                                            </tspan>

                                            <tspan
                                                x={viewBox.cx}
                                                y={viewBox.cy + 15}
                                                className="fill-muted-foreground text-sm"
                                            >
                                                {activeItem?.category ?? "Category"}
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