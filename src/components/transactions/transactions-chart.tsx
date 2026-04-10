"use client";

import {
    Area,
    AreaChart,
    CartesianGrid,
    XAxis,
    YAxis,
} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import React from "react";

export const description = "A savings current month progress chart";

const transactionsChartConfig = {
    income: {
        label: "Income",
        color: "var(--cyan-400)",
    },
    expense: {
        label: "Expense",
        color: "var(--chart-5)",
    },
} satisfies ChartConfig;

export interface TransactionChartData {
    date: string
    expense: number
    income: number
}

interface TransactionsChartProps {
    data: TransactionChartData[];
}

export function TransactionsChart({ data }: TransactionsChartProps) {
    const [timeRange, setTimeRange] = React.useState("6")

    let filteredData = data

    if (timeRange === "3") {
        filteredData = data.slice(9, 12)
    } else if (timeRange === "6") {
        filteredData = data.slice(6, 12)
    }

    function makeCardDescription(timeRange: string) {
        switch (timeRange) {
            case '3': return 'Last 3 months metrics progress'
            case '6': return 'Last 6 months metrics progress'
            case '12': return 'Last year metrics progress'
        }
    }

    return (
        <Card className="flex h-full min-h-0 flex-col overflow-hidden bg-transparent py-4">
            <CardHeader className="flex gap-1 px-4 pb-0">
                <div>
                    <CardTitle>Transactions</CardTitle>
                    <CardDescription>{makeCardDescription(timeRange)}</CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="bg-transparent hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                        aria-label="Select time range"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="12" className="rounded-lg">
                            Last 12 months
                        </SelectItem>
                        <SelectItem value="6" className="rounded-lg">
                            Last 6 months
                        </SelectItem>
                        <SelectItem value="3" className="rounded-lg">
                            Last 3 months
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="flex min-h-0 flex-1 px-4 pb-4">
                <ChartContainer
                    config={transactionsChartConfig}
                    className="h-full w-full !aspect-auto"
                >
                    <AreaChart data={filteredData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={15}
                            tickFormatter={(value) => {
                                const [month, year] = value.split(' ')

                                return `${month.slice(0, 3)} ${year.slice(2, 4)}`
                            }}
                            interval="preserveStartEnd"
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickCount={5}
                            orientation="left"
                            width={40}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <defs>
                            <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-expense)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-expense)" stopOpacity={0.1} />
                            </linearGradient>

                            <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-income)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-income)" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey="expense"
                            type="monotone"
                            fill="url(#fillExpense)"
                            fillOpacity={0.4}
                            stroke="var(--color-expense)"
                        />
                        <Area
                            dataKey="income"
                            type="monotone"
                            fill="url(#fillIncome)"
                            fillOpacity={0.4}
                            stroke="var(--color-income)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
