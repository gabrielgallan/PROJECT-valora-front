"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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

export const description = "An interactive area chart"

const chartData = [
    { date: "October 2025", expense: 0, income: 0 },
    { date: "November 2025", expense: 0, income: 0 },
    { date: "December 2025", expense: 250, income: 1800 },
    { date: "April 2025", expense: 0, income: 0 },
    { date: "January 2026", expense: 0, income: 0 },
    { date: "February 2026", expense: 20, income: 1000 },
    { date: "February 2026", expense: 400, income: 0 },
    { date: "February 2026", expense: 0, income: 100 },
    { date: "February 2026", expense: 2500, income: 1000 },
]

const chartConfig = {
    expense: {
        label: "Expense",
        color: "var(--red-500)",
    },
    income: {
        label: "Income",
        color: "var(--cyan-300)",
    }
} satisfies ChartConfig

export function ProgressChartAreaInteractive() {
    // const [timeRange, setTimeRange] = React.useState("90d")

    return (
        <Card className="overflow-hidden border-0 bg-transparent pt-0">
            <CardHeader className="flex items-center gap-2 space-y-0 px-0 pb-6 pt-0 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle className="text-lg">Annual progress</CardTitle>
                    <CardDescription>
                        Year-over-year balance trend
                    </CardDescription>
                </div>
                <Select>
                    <SelectTrigger
                        className="hidden w-[160px] rounded-full border-muted/60 bg-transparent sm:ml-auto sm:flex"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last year" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="year" className="rounded-lg">
                            Last year
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-0 pt-2 sm:pt-4">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[17rem] w-full"
                >
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-expense)"
                                    stopOpacity={0.6}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-expense)"
                                    stopOpacity={0.05}
                                />
                            </linearGradient>
                            <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-income)"
                                    stopOpacity={0.6}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-income)"
                                    stopOpacity={0.05}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} strokeDasharray="4 8" opacity={0.35} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={12}
                            tickFormatter={(value) => {
                                const [month, year] = value.split(" ")
                                return `${month.slice(0, 3)} ${year}`
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return value
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="income"
                            type="linear"
                            fill="url(#fillIncome)"
                            stroke="var(--color-income)"
                            strokeWidth={2}
                            stackId="a"
                            activeDot={{ r: 5, strokeWidth: 0 }}
                        />
                        <Area
                            dataKey="expense"
                            type="linear"
                            fill="url(#fillExpense)"
                            stroke="var(--color-expense)"
                            strokeWidth={2}
                            stackId="a"
                            activeDot={{ r: 5, strokeWidth: 0 }}
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
