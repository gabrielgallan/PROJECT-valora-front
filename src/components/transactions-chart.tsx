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

export const description = "A savings current month progress chart";

const transactionsChartConfig = {
    income: {
        label: "Income",
        color: "var(--cyan-400)",
    },
    expense: {
        label: "Expense",
        color: "var(--red-300)",
    },
} satisfies ChartConfig;

interface TransactionChartData {
    date: string
    expense: number
    income: number
}

interface TransactionsChartProps {
    // data: TransactionChartData[];
    month: string;
}

const mockData = [
    { date: "March", income: 600, expense: 49 },
    { date: "April", income: 200, expense: 450 },
    { date: "May", income: 749, expense: 0 },
    { date: "June", income: 450, expense: 300 },
    { date: "July", income: 150, expense: 650 },
    { date: "August", income: 80, expense: 320.12 },
];

export function TransactionsChart({ month }: TransactionsChartProps) {
    return (
        <Card className="flex h-full min-h-0 flex-col overflow-hidden bg-muded py-4">
            <CardHeader className="gap-1 px-4 pb-0">
                <CardTitle>Transactions</CardTitle>
                <CardDescription>{month}</CardDescription>
            </CardHeader>

            <CardContent className="flex min-h-0 flex-1 px-4 pb-4">
                <ChartContainer
                    config={transactionsChartConfig}
                    className="h-full w-full !aspect-auto"
                >
                    <AreaChart data={mockData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value}
                            interval="preserveStartEnd"
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickCount={4}
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
                            type="linear"
                            fill="url(#fillExpense)"
                            fillOpacity={0.4}
                            stroke="var(--color-expense)"
                        />
                        <Area
                            dataKey="income"
                            type="linear"
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